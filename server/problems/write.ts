"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { problems } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { updateTag } from "next/cache";

/**
 * PROBLEMS CRUD
 */

export const createProblem = async (data: {
  topicId: number;
  title: string;
  url?: string;
  source?: string;
  difficulty?: string;
}) => {
  await verifySession();
  try {
    const inserted = await db.insert(problems).values(data).returning();
    updateTag(`topic-${inserted[0].topicId}-page`);
    return {
      success: true,
      problem: inserted[0],
    };
  } catch {
    return {
      success: false,
      message: "Failed to create problem",
    };
  }
};

export const updateProblem = async (
  id: number,
  data: Partial<{
    topicId: number;
    title: string;
    url?: string;
    source?: string;
    difficulty?: string;
  }>
) => {
  await verifySession();
  try {
    const updated = await db
      .update(problems)
      .set(data)
      .where(eq(problems.id, id))
      .returning();
    updateTag(`topic-${updated[0].topicId}-page`);
    return {
      success: true,
      problem: updated[0] ?? null,
    };
  } catch {
    return {
      success: false,
      message: "Failed to update problem",
    };
  }
};

export const deleteProblem = async (id: number) => {
  await verifySession();
  try {
    const deleted = await db
      .delete(problems)
      .where(eq(problems.id, id))
      .returning();
    updateTag(`topic-${deleted[0].topicId}-page`);
    return {
      success: true,
      problem: deleted[0] ?? null,
    };
  } catch {
    return {
      success: false,
      message: "Failed to delete problem",
    };
  }
};
