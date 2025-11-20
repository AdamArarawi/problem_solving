"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

// نعمل dynamic import مع ssr false
const SyntaxHighlighter = dynamic(
  () => import("react-syntax-highlighter").then((mod) => mod.Prism),
  { ssr: false }
);

interface ExampleCodeProps {
  code: string;
}

const ExampleCodeInner = ({ code }: ExampleCodeProps) => {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter
      language="ts"
      style={theme === "dark" ? oneDark : oneLight}
      wrapLongLines
      customStyle={{ margin: 0, padding: "1rem", fontSize: "0.875rem" }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

const ExampleCode = ({ code }: ExampleCodeProps) => {
  return (
    <Suspense fallback={<pre style={{ padding: "1rem" }}>Loading code...</pre>}>
      <ExampleCodeInner code={code} />
    </Suspense>
  );
};

export default ExampleCode;
