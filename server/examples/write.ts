"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { examples } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { updateTag } from "next/cache";

/**
 * EXAMPLES CRUD
 */

export const createExample = async (data: {
  topicId: number;
  title: string;
  code?: string;
  output?: string;
  explanation?: string;
}) => {
  await verifySession();
  try {
    const inserted = await db.insert(examples).values(data).returning();
    updateTag(`topic-page`);
    return inserted[0];
  } catch {
    throw new Error("Failed to create example");
  }
};

export const updateExample = async (
  id: number,
  data: Partial<{
    topicId: number;
    title: string;
    code?: string;
    output?: string;
    explanation?: string;
  }>
) => {
  await verifySession();
  try {
    const updated = await db
      .update(examples)
      .set(data)
      .where(eq(examples.id, id))
      .returning();
    updateTag(`topic-page`);
    return updated[0] ?? null;
  } catch {
    throw new Error("Failed to update example");
  }
};

export const deleteExample = async (id: number) => {
  await verifySession();
  try {
    const deleted = await db
      .delete(examples)
      .where(eq(examples.id, id))
      .returning();
    updateTag(`topic-page`);
    return deleted[0] ?? null;
  } catch {
    throw new Error("Failed to delete example");
  }
};
