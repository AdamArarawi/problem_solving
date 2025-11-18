import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { TopicWithChildren } from "@/server/helpers/types";
import TopicSidebarItem from "./topic-sidebar-item";

export function NavTopics({ topics }: { topics: TopicWithChildren[] | null }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Topics</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {topics?.map((topic) => (
            <TopicSidebarItem key={topic.id} topic={topic} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
