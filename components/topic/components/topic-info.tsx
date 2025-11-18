import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Topic } from "@/db/schema";

export default async function TopicInfo({
  topic,
  success,
}: {
  topic: Topic;
  success: boolean;
}) {
  if (!success || !topic) {
    return <div className="p-6">Topic not found</div>;
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
        {topic.content && (
          <article
            className="
              prose 
              prose-gray 
              dark:prose-invert 
              prose-headings:scroll-mt-20 
              prose-h2:text-2xl 
              prose-h3:text-xl
              prose-pre:bg-muted
              prose-pre:text-sm
              prose-code:text-primary
              mt-8
              whitespace-pre-wrap
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {topic.content}
            </ReactMarkdown>
          </article>
        )}
      </div>
    </section>
  );
}
