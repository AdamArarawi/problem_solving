"use server";

import { db } from "@/db";
import { eq } from "drizzle-orm";
import { resources } from "@/db/schema";

export const getResourcesByTopicId = async (topicId: number) => {
  try {
    return {
      success: true,
      resources: await db
        .select()
        .from(resources)
        .where(eq(resources.topicId, topicId)),
    };
  } catch {
    return { success: false, error: "Failed to fetch resources" };
  }
};
