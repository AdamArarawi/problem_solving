import TopicPage from "./PageContent";
import { Suspense } from "react";
import PageWrapperSkeleton from "@/components/page-wrapper/page-wrapper-skeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<PageWrapperSkeleton />}>
      <TopicPage params={params} />
    </Suspense>
  );
}
