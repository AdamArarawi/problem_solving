import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { getTopicsTree } from "@/server/topics/tree";
import CreateTopicButton from "../topic/forms/create-topic";
import { NavTopics } from "../topic/nav/nav-topics";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NavUser } from "./nav-user";
import HomeButton from "./home-button";
import ThemeToggle from "./theme-toggle";

export async function TopicsSidebar() {
  const topics = await getTopicsTree();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-col gap-2">
        <SidebarMenuItem className="flex flex-row items-center gap-2 justify-between">
          <HomeButton />
        </SidebarMenuItem>

        {/* زر إضافة موضوع جديد */}
        <SidebarMenuItem>
          <CreateTopicButton>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2 "
              asChild
            >
              <SidebarMenuButton tooltip="Add Topic">
                <span className="text-sm font-medium">
                  <Plus />
                </span>
                <span>Add Topic</span>
              </SidebarMenuButton>
            </Button>
          </CreateTopicButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent>
        <NavTopics topics={topics} />
      </SidebarContent>
      <SidebarFooter>
        <ThemeToggle />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
