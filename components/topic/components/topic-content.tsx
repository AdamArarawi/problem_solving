import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { CodeBlock } from "@/components/code/code-block";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
            <p className=" leading-relaxed mt-4" {...props}>
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
            <ul className="list-disc pl-6 mt-4" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-6 mt-4" {...props}>
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
              <div className="overflow-x-auto mt-4">
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
            <div className="my-4 w-full overflow-auto rounded-md border">
              <Table {...props}>{children}</Table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <TableHeader {...props} className="bg-secondary hover:bg-secondary">
              {children}
            </TableHeader>
          ),
          tbody: ({ children, ...props }) => (
            <TableBody {...props}>{children}</TableBody>
          ),
          tr: ({ children, ...props }) => (
            <TableRow {...props}>{children}</TableRow>
          ),
          th: ({ children, ...props }) => (
            <TableHead {...props}>{children}</TableHead>
          ),
          td: ({ children, ...props }) => (
            <TableCell {...props}>{children}</TableCell>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
