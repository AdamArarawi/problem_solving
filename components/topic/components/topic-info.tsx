import { Topic } from "@/db/schema";
import MarkdownRenderer from "./topic-content";

export default async function TopicInfo({
  topic,
  success,
  markdownContent,
}: {
  topic: Topic;
  success: boolean;
  markdownContent: string;
}) {
  if (!success || !topic) {
    return <div className="p-6">Topic not found!</div>;
  }

  return (
    <section className="px-4 py-6">
      <div className="max-w-3xl space-y-6">
        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight">{topic.title}</h1>

        {/* Description */}
        {topic.description && (
          <p className="text-lg text-muted-foreground">{topic.description}</p>
        )}

        {/* Markdown Content */}
        {markdownContent && (
          <article className="mt-8 ">
            <MarkdownRenderer>{markdownContent}</MarkdownRenderer>
          </article>
        )}
      </div>
    </section>
  );
}
