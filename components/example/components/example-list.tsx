import ExampleCard from "./example-card";
import { Example } from "@/db/schema";

interface ExamplesListProps {
  examples: Example[] | null;
}

export default function ExamplesList({ examples }: ExamplesListProps) {
  if (!examples || examples.length === 0) {
    return <div className="text-muted-foreground">No examples found</div>;
  }

  return (
    <div className={`space-y-4`}>
      {examples.map((ex) => (
        <ExampleCard
          key={ex.id}
          id={ex.id}
          title={ex.title}
          code={ex.code || undefined}
          output={ex.output || undefined}
          language={ex.language}
          explanation={ex.explanation || undefined}
        />
      ))}
    </div>
  );
}
