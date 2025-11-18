import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { getTopicsTree } from "@/server/topics/tree";
import { SidebarGroupLabel } from "@/components/ui/sidebar";
import CreateTopicButton from "../topic/forms/create-topic";
import { NavTopics } from "../topic/nav/nav-topics";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { NavUser } from "./nav-user";
import HomeButton from "./home-button";

export async function TopicsSidebar() {
  const topics = await getTopicsTree();
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-2">
        <SidebarMenuItem className="flex items-center gap-2">
          <HomeButton />
        </SidebarMenuItem>
        <SidebarGroupLabel>Topics</SidebarGroupLabel>

        {/* زر إضافة موضوع جديد */}
        <CreateTopicButton>
          <Button
            variant="secondary"
            size="sm"
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
        <NavTopics topics={topics} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
