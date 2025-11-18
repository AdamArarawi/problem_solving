"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { problems } from "@/db/schema";

export const getProblemsByTopicId = async (topicId: number) => {
  try {
    return {
      success: true,
      problems: await db
        .select()
        .from(problems)
        .where(eq(problems.topicId, topicId)),
    };
  } catch {
    return {
      success: false,
      message: "Failed to fetch problems",
    };
  }
};
