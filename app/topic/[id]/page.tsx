import TopicPage from "./PageContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const topicId = Number((await params).id);
  console.log(topicId);
  return <TopicPage topicId={topicId} />;
}

export async function generateStaticParams() {
  return [{ id: "10" }, { id: "15" }];
}
