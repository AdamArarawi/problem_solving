import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

const TopicContent = ({ content }: { content: string }) => {
  return (
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
    prose-pre:overflow-auto
    prose-pre:whitespace-pre-wrap
    prose-pre:break-words
    prose-code:text-primary
    prose-pre:w-full
    prose-pre:max-w-full
    mt-8
    w-full
  "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default TopicContent;
