"use server";

import { db } from "@/db";
import { asc } from "drizzle-orm";
import { topics } from "@/db/schema";
import type { TopicWithChildren } from "../helpers/types";
import { cacheLife, cacheTag } from "next/cache";

/**
 * READ: Build topics tree (useful for sidebar / )
 * returns array of root topics with nested children arrays
 */
export const getTopicsTree = async () => {
  "use cache";
  cacheLife("max");
  cacheTag("topics-tree");
  try {
    const all = await db.select().from(topics).orderBy(asc(topics.order));

    const map = new Map<number, TopicWithChildren>();

    all.forEach((t) => {
      map.set(t.id, { ...t, children: [] });
    });

    const roots: TopicWithChildren[] = [];

    all.forEach((t) => {
      const node = map.get(t.id)!;

      if (t.parentId == null) {
        roots.push(node);
      } else {
        const parent = map.get(t.parentId);
        if (parent) parent.children.push(node);
        else roots.push(node); // fallback
      }
    });

    return roots || [];
  } catch {
    return null;
  }
};

export const getTopicsByParent = async (
  parentId: number | null
): Promise<{
  success: boolean;
  message?: string;
  topics?: TopicWithChildren[];
}> => {
  const tree = await getTopicsTree();
  if (!tree) return { success: false, message: "Failed to get topics" };

  const result: TopicWithChildren[] = [];

  const searchChildren = (nodes: TopicWithChildren[]) => {
    for (const node of nodes) {
      if (node.parentId === parentId) {
        result.push(node);
      }
      if (node.children.length > 0) {
        searchChildren(node.children);
      }
    }
  };

  searchChildren(tree);
  return { success: true, topics: result };
};
