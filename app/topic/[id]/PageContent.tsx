import { PageWrapper } from "@/components/page-wrapper";
import TopicsSection from "@/components/topic";
import TopicInfo from "@/components/topic/components/topic-info";
import ExamplesSection from "@/components/example";
import ProblemsSection from "@/components/problem";
import ResourceSection from "@/components/resource";
import { cacheLife, cacheTag } from "next/cache";
import { getFullTopic } from "@/server/topics/read";

interface PageContentProps {
  params: Promise<{ id: string }>;
}

export default async function TopicPage({ params }: PageContentProps) {
  "use cache";
  const { id } = await params;
  const topicId = Number(id);
  cacheLife("max");
  cacheTag(`topic-${topicId}-page`);
  const fullTopic = await getFullTopic(topicId);
  if (!fullTopic || !fullTopic.topic.topic)
    return (
      <PageWrapper>
        <main className="flex w-full justify-center">
          <div className="w-full max-w-5xl px-6 py-10 space-y-12">
            Topic not found
          </div>
        </main>
      </PageWrapper>
    );
  return (
    <PageWrapper selectedTopicId={topicId}>
      <main className="flex w-full sm:justify-center">
        <div className="w-full max-w-5xl px-6 py-10 space-y-12">
          {/* Topic Content */}
          <div className="border-b pb-10">
            <TopicInfo
              topic={fullTopic.topic.topic}
              success={fullTopic.topic.success}
            />
          </div>

          {/* Examples Section */}
          <ExamplesSection
            examples={fullTopic.examples.examples}
            topicId={topicId}
          />

          {/* Resources Section */}
          <ResourceSection
            resources={fullTopic.resources.resources}
            topicId={topicId}
          />

          {/* Problems Section */}
          <ProblemsSection
            problems={fullTopic.problems.problems}
            topicId={topicId}
          />

          {/* Sub Topics Section */}
          <TopicsSection
            topics={fullTopic.topic.children}
            topicId={topicId}
            success={fullTopic.topic.success}
          />
        </div>
      </main>
    </PageWrapper>
  );
}
