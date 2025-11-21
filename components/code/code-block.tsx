// components/code-block.tsx
import { highlightCode } from "@/lib/shiki";
import { CopyCodeButton } from "./copy-code-button";

export async function CodeBlock({
  code,
  lang = "py",
}: {
  code: string;
  lang?: string;
}) {
  // server-side: generate highlighted HTML
  const html = await highlightCode(code, lang);

  return (
    <div className="relative overflow-hidden bg-code text-code-foreground  rounded-md border border-border ">
      {/* عرض لغة الكود أعلى يسار */}
      <div className="flex items-center justify-between py-1 px-2 border-b-2 border-border">
        <div className=" rounded bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
          {lang.toUpperCase()}
        </div>

        {/* زر النسخ أعلى يمين */}
        <div className="">
          <CopyCodeButton content={code} />
        </div>
      </div>
      {/* الكود نفسه */}
      <div
        className="overflow-x-auto px-4 font-mono text-sm "
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
