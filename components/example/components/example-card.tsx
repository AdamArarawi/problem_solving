// import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, ChevronDown } from "lucide-react";
import UpdateExampleButton from "../forms/update-example";
import DeleteExampleButton from "../forms/delete-example";
import { CodeBlock } from "../../code/code-block";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import MarkdownRenderer from "../../markdown";

interface ExampleCardProps {
  id: number;
  title: string;
  code?: string;
  output?: string;
  explanation?: string;
  language?: string;
}

export default function ExampleCard({
  id,
  title,
  code,
  output,
  explanation,
  language,
}: ExampleCardProps) {
  return (
    <Collapsible className="rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow">
      {" "}
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center cursor-pointer p-4">
          <h3 className="font-medium text-primary">{title}</h3>{" "}
          <ChevronDown className="w-5 h-5 transition-transform data-[state=open]:rotate-90" />{" "}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-4 pt-0 px-4 pb-2">
        {code && (
          <div className="overflow-auto">
            <CodeBlock code={code} lang={language} className="max-h-60" />
          </div>
        )}
        {output && (
          <div className="bg-muted text-muted-foreground p-2 rounded-md font-mono text-sm">
            <strong>Output:</strong> {output}
          </div>
        )}
        {explanation && (
          <article className="text-sm text-foreground/90">
            <MarkdownRenderer>{explanation}</MarkdownRenderer>
          </article>
        )}
        <div className="flex justify-end gap-2 p-0 pt-2">
          <UpdateExampleButton
            id={id}
            title={title}
            code={code}
            output={output}
            explanation={explanation}
            language={language}
          >
            <Button variant="outline" size="icon">
              <Edit className="w-4 h-4" />
            </Button>
          </UpdateExampleButton>

          <DeleteExampleButton id={id} title={title}>
            <Button variant="destructive" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </DeleteExampleButton>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
