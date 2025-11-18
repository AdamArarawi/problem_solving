import ExampleCard from "./example-card";
import { Example } from "@/db/schema";

interface ExamplesListProps {
  examples: Example[] | null;
}

export default async function ExamplesList({ examples }: ExamplesListProps) {
  if (!examples || examples.length === 0) {
    return <div className="text-muted-foreground">No examples found</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {examples.map((ex) => (
        <ExampleCard
          key={ex.id}
          id={ex.id}
          title={ex.title}
          code={ex.code || undefined}
          output={ex.output || undefined}
          explanation={ex.explanation || undefined}
        />
      ))}
    </div>
  );
}
