import type { Topic } from "@/db/schema";

export interface TopicWithChildren extends Topic {
  children: TopicWithChildren[];
}
