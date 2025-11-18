import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export function NavTopicsSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Topics</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* Main Topic Button */}
            <SidebarMenuButton
              asChild
              className={"bg-accent text-accent-foreground"}
            >
              <div>
                <Skeleton className="w-full h-4" />
              </div>
            </SidebarMenuButton>

            {/* Normal collapsible for depth 0 and 1 */}
            <SidebarMenuAction
              className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90 transition-transform"
              showOnHover
            >
              <ChevronRight />
            </SidebarMenuAction>

            <SidebarMenuSub>
              <Skeleton className="w-full h-4" />
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
