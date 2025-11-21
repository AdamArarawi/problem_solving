import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/components/code/code-block";

export default function TopicContent({ children }: { children: string }) {
  return (
    <div className="overflow-auto  max-w-full">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings H1-H6
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold  mt-6" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-semibold  mt-5" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold  mt-4" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="text-lg font-medium  mt-3" {...props}>
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 className="text-base font-medium  mt-2" {...props}>
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 className="text-sm font-medium  mt-2" {...props}>
              {children}
            </h6>
          ),

          // Paragraphs
          p: ({ children, ...props }) => (
            <p className=" leading-relaxed" {...props}>
              {children}
            </p>
          ),

          // Links
          a: ({ children, ...props }) => (
            <a className="text-blue-500 hover:underline" {...props}>
              {children}
            </a>
          ),

          // Lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-6 " {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 " {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="" {...props}>
              {children}
            </li>
          ),

          // Horizontal rule
          hr: (props) => (
            <hr
              className="my-4 border-gray-300 dark:border-gray-600"
              {...props}
            />
          ),

          // Inline code / code blocks
          code: ({ className, children: codeChildren, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const codeString = String(codeChildren).replace(/\n$/, "");
            return match ? (
              <div className="overflow-x-auto">
                <CodeBlock code={codeString} lang={match[1]} />
              </div>
            ) : (
              <code
                className="bg-secondary p-1 rounded-sm font-mono"
                {...props}
              >
                {codeChildren}
              </code>
            );
          },

          // Tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto ">
              <table
                className="table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children, ...props }) => (
            <th
              className="border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-100 dark:bg-gray-700 font-semibold text-left"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              className="border border-gray-300 dark:border-gray-600 px-2 py-1"
              {...props}
            >
              {children}
            </td>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
