import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";
import UpdateExampleButton from "../forms/update-example";
import DeleteExampleButton from "../forms/delete-example";
import { CodeBlock } from "../../code/code-block";

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
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow">
      <CardContent className="space-y-4">
        <h3 className="font-medium text-primary">{title}</h3>

        {code && (
          <div className="overflow-auto rounded-md border border-border">
            <CodeBlock code={code} lang={language} />
          </div>
        )}

        {output && (
          <div className="bg-muted text-muted-foreground p-2 rounded-md font-mono text-sm">
            <strong>Output:</strong> {output}
          </div>
        )}

        {explanation && (
          <div className="text-sm text-foreground/90">{explanation}</div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
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
      </CardFooter>
    </Card>
  );
}
