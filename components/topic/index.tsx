import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateTopicButton from "./forms/create-topic";
import TopicsList from "./components/topices-list";
import { Topic } from "@/db/schema";

interface TopicProps {
  topics: Topic[] | null;
  topicId: number;
  success: boolean;
}

const TopicsSection = async ({ topics, topicId, success }: TopicProps) => {
  return (
    <>
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Sub Topics</h2>
          <CreateTopicButton parent={topicId}>
            <Button
              size="sm"
              variant="secondary"
              className="flex items-center gap-1"
            >
              <Plus size={16} /> Add Subtopic
            </Button>
          </CreateTopicButton>
        </div>
        <div className="border rounded-lg p-4">
          {(topics?.length === 0 && (
            <div className="text-muted-foreground">No sub topics found</div>
          )) || <TopicsList topics={topics} success={success} />}
        </div>
      </section>
    </>
  );
};
export default TopicsSection;
