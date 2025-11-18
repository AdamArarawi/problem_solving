import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateProblemButton from "./forms/create-problem";
import ProblemsList from "./components/problem-list";
import { Problem } from "@/db/schema";

interface ProblemProps {
  problems: Problem[] | null;
  topicId: number;
}

const ProblemsSection = async ({ problems, topicId }: ProblemProps) => {
  return (
    <>
      {/* Examples Section */}
      <section className="border-b pb-10 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Problems</h2>
          <CreateProblemButton topicId={topicId}>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add Problem
            </Button>
          </CreateProblemButton>
        </div>
        <div className="border rounded-lg p-4">
          <ProblemsList problems={problems} />
        </div>
      </section>
    </>
  );
};
export default ProblemsSection;
