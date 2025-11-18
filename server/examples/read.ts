"use server";

import { db } from "@/db";
import { eq, asc } from "drizzle-orm";
import { examples } from "@/db/schema";
export const getExamplesByTopicId = async (topicId: number) => {
  try {
    return await db
      .select()
      .from(examples)
      .where(eq(examples.topicId, topicId))
      .orderBy(asc(examples.createdAt));
  } catch (err) {
    throw new Error("Failed to fetch examples");
  }
};
