import ExamplesList from "./components/example-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateExampleButton from "./forms/create-example";
import { Example } from "@/db/schema";

interface ExampleProps {
  examples: Example[] | null;
  topicId: number;
}

const ExamplesSection = async ({ examples, topicId }: ExampleProps) => {
  return (
    <>
      {/* Examples Section */}
      <section className="border-b pb-10 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Examples</h2>
          <CreateExampleButton topicId={topicId}>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add Example
            </Button>
          </CreateExampleButton>
        </div>
        <div className="border rounded-lg p-4">
          <ExamplesList examples={examples} />
        </div>
      </section>
    </>
  );
};
export default ExamplesSection;
