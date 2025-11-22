"use server";

import { db } from "@/db";
import { eq, desc, isNull } from "drizzle-orm";
import { Topic, topics } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { slugify } from "../helpers/slugify";
import { revalidateTag, updateTag } from "next/cache";

/**
 * TOPICS CRUD
 */
export const createTopic = async (data: {
  title: string;
  description?: string;
  content?: string;
  parentId?: number | null;
  order?: number;
  slug?: string;
}) => {
  await verifySession();
  try {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title);
    // ensure uniqueness of slug (append number if exists)
    let uniqueSlug = slug;
    let counter = 1;

    while (true) {
      const [exists] = await db
        .select()
        .from(topics)
        .where(eq(topics.slug, uniqueSlug));
      if (!exists) break;
      uniqueSlug = `${slug}-${counter++}`;
    }

    // --- Handle ORDER ---
    // If order not provided, auto-generate incrementally
    const lastOrder = await db
      .select({ order: topics.order })
      .from(topics)
      .where(
        data.parentId === null || data.parentId === undefined
          ? isNull(topics.parentId)
          : eq(topics.parentId, data.parentId)
      )
      .orderBy(desc(topics.order))
      .limit(1);

    const nextOrder =
      data.order ?? (lastOrder.length > 0 ? (lastOrder[0].order ?? -1) + 1 : 0);

    const inserted = await db
      .insert(topics)
      .values({
        title: data.title,
        description: data.description ?? null,
        content: data.content ?? null,
        parentId: data.parentId ?? null,
        order: nextOrder,
        slug: uniqueSlug,
      })
      .returning();
    if (!inserted[0].parentId) revalidateTag(`topics-list`, "max");
    updateTag(`topics-tree`);
    return { success: true, topic: inserted[0] };
  } catch (err) {
    return { success: false, message: "Failed to create topic" };
  }
};

export const updateTopic = async (id: number, data: Partial<Topic>) => {
  await verifySession();
  try {
    const payload: Partial<Topic> = { ...data };
    if (data.title && !data.slug) {
      // regenerate slug only if explicitly not provided but title changed
      payload.slug = slugify(data.title);
    } else if (data.slug === null) {
      payload.slug = null;
    } else if (data.slug) {
      payload.slug = slugify(data.slug);
    }
    const updated = await db
      .update(topics)
      .set(payload)
      .where(eq(topics.id, id))
      .returning();
    if (
      !updated[0].parentId &&
      updated[0].title !== payload.title &&
      updated[0].description !== payload.description
    )
      revalidateTag(`topics-list`, "max");
    updateTag(`topics-tree`);
    updateTag(`topic-${id}-page`);
    return { success: true, topic: updated[0] ?? null };
  } catch (err) {
    return { success: false, message: "Failed to update topic" };
  }
};

export const deleteTopic = async (id: number) => {
  await verifySession();
  try {
    const deleted = await db
      .delete(topics)
      .where(eq(topics.id, id))
      .returning();
    if (!deleted[0].parentId) revalidateTag(`topics-list`, "max");
    updateTag(`topics-tree`);
    updateTag(`topic-${id}-page`);
    return { success: true, topic: deleted[0] ?? null };
  } catch (err) {
    return { success: false, message: "Failed to delete topic" };
  }
};
