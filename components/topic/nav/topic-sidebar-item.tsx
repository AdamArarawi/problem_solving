"use client";

import { ChevronRight, FileText } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuAction,
} from "@/components/ui/sidebar";

import TopicSettingDropdown from "./topic-setting-dropdown";
import TopicDrawer from "../components/topic-drawer";

import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { TopicWithChildren } from "@/server/helpers/types";
import { useState } from "react";

function containsSelected(
  topic: TopicWithChildren,
  selectedId: number
): boolean {
  if (!selectedId) return false;
  if (topic.id === selectedId) return true;
  return topic.children.some((child) => containsSelected(child, selectedId));
}

export default function TopicSidebarItem({
  topic,
  depth = 0,
}: {
  topic: TopicWithChildren;
  depth?: number;
}) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const selectedId = Number(pathname.split("/").pop());

  const hasChildren = topic.children.length > 0;
  const showDrawerInstead = depth >= 2;

  const isParentOfSelected = containsSelected(topic, selectedId);

  const [manualOpen, setManualOpen] = useState(false);

  const isOpen = isParentOfSelected || manualOpen;

  return (
    <Collapsible open={isOpen} onOpenChange={setManualOpen}>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link
            href={`/topic/${topic.id}`}
            onClick={() => setOpenMobile(false)}
            className={selectedId === topic.id ? "bg-sidebar-accent" : ""}
          >
            <FileText className="w-4 h-4 text-sidebar-foreground" />
            <span>{topic.title}</span>
          </Link>
        </SidebarMenuButton>

        <TopicSettingDropdown
          topicId={topic.id}
          title={topic.title}
          description={topic.description ?? ""}
          content={topic.content ?? ""}
        />

        {hasChildren && !showDrawerInstead && (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction
                className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90 transition-transform"
                showOnHover
              >
                <ChevronRight />
              </SidebarMenuAction>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {topic.children.map((child) => (
                  <TopicSidebarItem
                    key={child.id}
                    topic={child}
                    depth={depth + 1}
                  />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        )}

        {hasChildren && showDrawerInstead && (
          <TopicDrawer topic={topic}>
            <SidebarMenuAction
              className="bg-sidebar-accent text-sidebar-accent-foreground left-2"
              showOnHover
            >
              <ChevronRight />
            </SidebarMenuAction>
          </TopicDrawer>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}
