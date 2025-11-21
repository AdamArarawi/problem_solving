import { ReactNode } from "react";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import SidebarBreadcrumb from "./sidebar-breadcrumb";
import { NavActions } from "./nav-actions";
interface PageWrapperProps {
  children: ReactNode;
  selectedTopicId?: number;
}

export function PageWrapper({ children, selectedTopicId }: PageWrapperProps) {
  return (
    <>
      {/* Main content */}
      <SidebarInset className="min-h-full">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <SidebarBreadcrumb selectedTopicId={selectedTopicId} />
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">{children}</div>
      </SidebarInset>
    </>
  );
}
