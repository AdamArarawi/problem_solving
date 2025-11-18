import { TopicWithChildren } from "@/server/helpers/types";

export function findTopicPath(
  topics: TopicWithChildren[],
  topicId: number
): TopicWithChildren[] | null {
  for (const topic of topics) {
    if (topic.id === topicId) return [topic];
    if (topic.children.length > 0) {
      const childPath = findTopicPath(topic.children, topicId);
      if (childPath) return [topic, ...childPath];
    }
  }
  return null;
}
