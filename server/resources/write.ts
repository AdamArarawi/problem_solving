"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { resources } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { updateTag } from "next/cache";

/**
 * RESOURCES CRUD
 */

export const createResource = async (data: {
  topicId: number;
  title: string;
  url: string;
  type?: string;
}) => {
  await verifySession();
  try {
    const inserted = await db.insert(resources).values(data).returning();
    updateTag(`topic-page`);

    return { success: true, data: inserted[0] };
  } catch {
    return { success: false, error: "Failed to create resource" };
  }
};

export const updateResource = async (
  id: number,
  data: Partial<{ topicId: number; title: string; url: string; type: string }>
) => {
  await verifySession();
  try {
    const updated = await db
      .update(resources)
      .set(data)
      .where(eq(resources.id, id))
      .returning();
    updateTag(`topic-page`);
    return { success: true, data: updated[0] ?? null };
  } catch {
    return { success: false, error: "Failed to update resource" };
  }
};

export const deleteResource = async (id: number) => {
  await verifySession();
  try {
    const deleted = await db
      .delete(resources)
      .where(eq(resources.id, id))
      .returning();
    updateTag(`topic-page`);
    return { success: true, data: deleted[0] ?? null };
  } catch {
    return { success: false, error: "Failed to delete resource" };
  }
};
