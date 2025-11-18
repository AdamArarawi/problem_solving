import TopicCard from "@/components/topic/components/topic-card";
import type { Topic } from "@/db/schema";

async function TopicsList({
  topics,
  success,
}: {
  topics?: Topic[] | null;
  success: boolean;
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics?.map((topic) => (
          <TopicCard key={topic.id} topic={topic} />
        ))}
      </div>
      {success &&
        (topics?.length === 0 || (!topics && <div>No topics found</div>))}
    </>
  );
}

export default TopicsList;
