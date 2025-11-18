"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { MoreHorizontal, Plus, Edit } from "lucide-react";
import { SidebarMenuAction } from "../../ui/sidebar";
import { useSidebar } from "../../ui/sidebar";
import { Trash2 } from "lucide-react";
import CreateTopicButton from "../forms/create-topic";
import { useState } from "react";
import DeleteTopicButton from "../forms/delete-topic";
import UpdateTopicButton from "../forms/update-topic";

const TopicSettingDropdown = ({
  topicId,
  title,
  description,
  content,
}: {
  topicId: number;
  title: string;
  content: string;
  description: string;
}) => {
  const { isMobile } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddingOpen, setIsAddingOpen] = useState(false);
  const [isDeletingOpen, setIsDeletingOpen] = useState(false);
  const [isUpdatingOpen, setIsUpdatingOpen] = useState(false);
  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem
            onSelect={() => {
              setIsAddingOpen(true); // فتح الـ dialog يدويًا
            }}
          >
            <Plus className="text-muted-foreground" />
            <span>Add Sub Topic</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setIsUpdatingOpen(true); // فتح الـ dialog يدويًا
            }}
          >
            <Edit className="text-muted-foreground" />
            <span>Edit Topic</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              setIsDeletingOpen(true); // فتح الـ dialog يدويًا
            }}
          >
            <Trash2 className="text-muted-foreground" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <CreateTopicButton
        parent={topicId}
        open={isAddingOpen}
        setOpen={setIsAddingOpen}
      />
      <UpdateTopicButton
        id={topicId}
        title={title}
        description={description}
        content={content}
        open={isUpdatingOpen}
        setOpen={setIsUpdatingOpen}
      />
      <DeleteTopicButton
        parent={topicId}
        title={title}
        open={isDeletingOpen}
        setOpen={setIsDeletingOpen}
      />
    </>
  );
};

export default TopicSettingDropdown;
