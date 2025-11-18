import { TopicsSidebar } from "@/components/page-wrapper/app-sidebar";
import { TopicsSidebar as TopicsSidebarSkeleton } from "@/components/page-wrapper/app-sidebar-skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Suspense
        fallback={
          <div>
            <TopicsSidebarSkeleton />
          </div>
        }
      >
        <TopicsSidebar />
      </Suspense>
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
