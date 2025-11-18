import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import CreateTopicButton from "../topic/forms/create-topic";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Home } from "lucide-react";
import { NavTopicsSkeleton } from "../topic/nav/nav-topics-skeleton";

export async function TopicsSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-2">
        <SidebarMenuItem className="flex items-center gap-2">
          <SidebarMenuButton tooltip="Quick Create" asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/">
                <Home />
                <span>Home</span>
              </Link>
            </Button>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarGroupLabel>Topics</SidebarGroupLabel>

        {/* زر إضافة موضوع جديد */}
        <CreateTopicButton>
          <Button
            variant="secondary" // مناسب للsidebar، أو "outline"
            size="sm" // صغير ليتناسب مع الsidebar
            className="w-full justify-start gap-2 text-sidebar-foreground"
          >
            {/* أيقونة + نص */}
            <span className="text-sm font-medium">
              <Plus />
            </span>
            <span>Add Topic</span>
          </Button>
        </CreateTopicButton>
      </SidebarHeader>

      <SidebarContent>
        <NavTopicsSkeleton />
      </SidebarContent>
    </Sidebar>
  );
}
