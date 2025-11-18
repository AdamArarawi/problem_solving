"use client";

import * as React from "react";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UpdateTopicButton from "../topic/forms/update-topic";
import DeleteTopicButton from "../topic/forms/delete-topic";
import type { Topic } from "@/db/schema";
import { getTopicById } from "@/server/topics/read";
import { usePathname } from "next/navigation";

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isUpdatingOpen, setIsUpdatingOpen] = React.useState(false);
  const [isDeletingOpen, setIsDeletingOpen] = React.useState(false);
  const pathname = usePathname();
  const selectedTopicId = Number(pathname.split("/").pop());

  const [topic, setTopic] = React.useState<Topic | null>(null);

  React.useEffect(() => {
    if (!selectedTopicId) return;

    async function fetchTopic() {
      if (!selectedTopicId) return;
      const res = await getTopicById(selectedTopicId);
      if (res.success && res.topic) {
        setTopic(res.topic);
      }
    }

    fetchTopic();
  }, [selectedTopicId]);

  if (!topic) return null;

  if (!selectedTopicId) return null;

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="data-[state=open]:bg-accent h-7 w-7"
            >
              <MoreHorizontal />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-56 overflow-hidden rounded-lg p-0"
            align="end"
          >
            <Sidebar collapsible="none" className="bg-transparent">
              <SidebarContent>
                <SidebarGroup className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setIsUpdatingOpen(true)}
                        >
                          <Pencil /> <span>Edit</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton
                          onClick={() => setIsDeletingOpen(true)}
                        >
                          <Trash /> <span>Delete</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </PopoverContent>
        </Popover>
      </div>
      <UpdateTopicButton
        id={selectedTopicId}
        title={topic.title}
        description={topic.description ?? ""}
        content={topic.content ?? ""}
        open={isUpdatingOpen}
        setOpen={setIsUpdatingOpen}
      />
      <DeleteTopicButton
        parent={selectedTopicId}
        title={topic.title}
        open={isDeletingOpen}
        setOpen={setIsDeletingOpen}
      />
    </>
  );
}
