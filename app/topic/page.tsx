import { PageWrapper } from "@/components/page-wrapper";
import PageContent from "./page-content";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page() {
  return (
    <PageWrapper>
      <div className="container h-full">
        <Suspense
          fallback={
            <>
              <Skeleton className="max-h-[400px]" />
            </>
          }
        >
          <PageContent />
        </Suspense>
      </div>
    </PageWrapper>
  );
}
