"use server";

import { db } from "@/db";
// تم استيراد isNull لمعالجة شرط WHERE column IS NULL
import { asc, eq, isNull } from "drizzle-orm";
import { topics } from "@/db/schema";
import type { TopicWithChildren } from "../helpers/types";
import { cacheLife, cacheTag } from "next/cache";

/**
 * READ: Build topics tree (useful for sidebar / )
 * Returns array of root topics with nested children arrays.
 * This is used for navigation components that require the full hierarchy.
 */
export const getTopicsTree = async () => {
  // "use cache";
  // // هذا التخزين يستخدم للشجرة الكاملة (Sidebar)
  // cacheLife("max");
  // cacheTag("topics-tree");
  // console.log("topics-tree");

  try {
    // 1. جلب جميع المواضيع في قائمة مسطحة
    const all = await db.select().from(topics).orderBy(asc(topics.order));

    // 2. بناء الهيكل الشجري (Tree Structure) في الذاكرة
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
        else roots.push(node); // fallback for orphaned nodes
      }
    });

    return roots || [];
  } catch {
    return null;
  }
};

/**
 * READ: Get topics list only for a specific parent ID (or Root Topics if parentId is null).
 * This function is optimized for lists where only direct children are needed.
 * It queries the DB directly and uses an independent, dynamic cache tag.
 */
export const getTopicsByParent = async (
  parentId: number | null
): Promise<{
  success: boolean;
  message?: string;
  topics?: TopicWithChildren[];
}> => {
  "use cache";
  // استخدام Tag ديناميكي: 'root' للمواضيع التي لا يوجد لها أب، أو رقم الأب
  cacheTag(`topics-list`);
  cacheLife("max");
  console.log("topics-list");
  try {
    // 💡 بناء شرط الـ WHERE لتجنب خطأ مقارنة NULL:
    // إذا كان parentId يساوي null، نستخدم isNull(column) --> WHERE parent_id IS NULL
    // وإلا، نستخدم eq(column, value) --> WHERE parent_id = N
    const condition =
      parentId === null
        ? isNull(topics.parentId)
        : eq(topics.parentId, parentId);

    // استعلام قاعدة البيانات مباشرة لضمان استقلال الـ Cache
    const directChildren = await db
      .select()
      .from(topics)
      .where(condition)
      .orderBy(asc(topics.order));

    // تحويل النتائج إلى النوع المطلوب
    const result: TopicWithChildren[] = directChildren.map((t) => ({
      ...t,
      children: [], // القائمة الناتجة لا تحتاج إلى الأحفاد في هذا الاستخدام
    }));

    return { success: true, topics: result };
  } catch (e) {
    console.error("Error fetching topics by parent:", e);
    return { success: false, message: "Failed to get topics from database." };
  }
};
