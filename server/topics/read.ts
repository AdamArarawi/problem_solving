"use server";

import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import { topics, examples, problems, resources } from "@/db/schema";
import { cacheLife, cacheTag } from "next/cache";

export const getFullTopic = async (id: number) => {
  "use cache";
  cacheLife("max");
  cacheTag(`topic-${id}-page`);
  console.log(id);
  try {
    const [topic] = await db.select().from(topics).where(eq(topics.id, id));
    if (!topic) return null;

    // parallel fetch all related content
    const [examplesList, problemsList, resourcesList, childrenList] =
      await Promise.all([
        db
          .select()
          .from(examples)
          .where(eq(examples.topicId, id))
          .orderBy(asc(examples.createdAt)),
        db
          .select()
          .from(problems)
          .where(eq(problems.topicId, id))
          .orderBy(asc(problems.createdAt)),
        db
          .select()
          .from(resources)
          .where(eq(resources.topicId, id))
          .orderBy(asc(resources.createdAt)),
        db
          .select()
          .from(topics)
          .where(eq(topics.parentId, id))
          .orderBy(asc(topics.order)),
      ]);

    return {
      topic: {
        topic,
        children: childrenList,
        success: true,
      },
      examples: {
        examples: examplesList,
        success: true,
      },
      problems: {
        problems: problemsList,
        success: true,
      },
      resources: {
        resources: resourcesList,
        success: true,
      },
    };
  } catch {
    return {
      topic: {
        topic: null,
        success: false,
      },
      examples: {
        examples: [],
        success: false,
      },
      problems: {
        problems: [],
        success: false,
      },
      resources: {
        resources: [],
        success: false,
      },
    };
  }
};

/**
 * READ: Topics (list) - cached
 */
export const getTopics = async () => {
  try {
    const rows = await db.select().from(topics).orderBy(asc(topics.order));
    return { success: true, topics: rows };
  } catch (err) {
    return { success: false, message: "Failed to fetch topics" };
  }
};

/**
 * READ: Get topic by id
 */
export const getTopicById = async (id: number) => {
  try {
    const [row] = await db.select().from(topics).where(eq(topics.id, id));
    return { success: true, topic: row ?? null };
  } catch (err) {
    return { success: false, message: "Failed to fetch topic" };
  }
};

/**
 * READ: Get topic by slug
 */
export const getTopicBySlug = async (slug: string) => {
  try {
    const [row] = await db.select().from(topics).where(eq(topics.slug, slug));
    return row ?? null;
  } catch (err) {
    throw new Error("Failed to fetch topic by slug");
  }
};
