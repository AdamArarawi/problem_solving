import { cacheTag, cacheLife } from "next/cache";
import { PageWrapper } from "@/components/page-wrapper";
import TopicsList from "@/components/topic/components/topices-list";
import { getTopicsByParent } from "@/server/topics/tree";

export default async function Page() {
  "use cache";
  cacheTag("topics-list");
  cacheLife("max");
  const topics = await getTopicsByParent(null);
  return (
    <PageWrapper>
      <div className="container">
        <TopicsList success={topics.success} topics={topics.topics} />
      </div>
    </PageWrapper>
  );
}
