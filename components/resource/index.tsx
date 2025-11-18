import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateResourceButton from "./forms/create-resource";
import ResourcesList from "./components/resource-list";
import { Resource } from "@/db/schema";

interface ResourceProps {
  resources: Resource[] | null;
  topicId: number;
}

const ResourceSection = async ({ resources, topicId }: ResourceProps) => {
  return (
    <>
      {/* Examples Section */}
      <section className="border-b pb-10 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Resources</h2>
          <CreateResourceButton topicId={topicId}>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add Resource
            </Button>
          </CreateResourceButton>
        </div>
        <div className="border rounded-lg p-4">
          <ResourcesList resources={resources} />
        </div>
      </section>
    </>
  );
};
export default ResourceSection;
