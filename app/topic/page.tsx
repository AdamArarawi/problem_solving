import { PageWrapper } from "@/components/page-wrapper";
import TopicsList from "@/components/topic/components/topices-list";
import { getTopicsByParent } from "@/server/topics/tree";

export default async function Page() {
  const topics = await getTopicsByParent(null);
  return (
    <PageWrapper>
      <div className="container h-full">
        <TopicsList success={topics.success} topics={topics.topics} />
      </div>
    </PageWrapper>
  );
}
