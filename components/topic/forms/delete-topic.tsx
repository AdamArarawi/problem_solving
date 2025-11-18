"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { deleteTopic } from "@/server/topics/write";
import { toast } from "sonner";
import { Spinner } from "../../ui/spinner";
import { useRouter } from "next/navigation";

const DeleteTopicButton = ({
  parent,
  open,
  setOpen,
  children,
  title = "",
}: {
  parent?: number;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: React.ReactNode;
  title?: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  // نختار أي state نستخدمه
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = setOpen !== undefined ? setOpen : setInternalOpen;

  async function onSubmit() {
    try {
      setIsLoading(true);
      const response = await deleteTopic(parent!);

      if (response) {
        toast.success("Topic deleted successfully");
        router.replace("/topic");
        setIsOpen(false);
      } else {
        toast.error("Failed to delete topic");
      }
    } catch {
      toast.error("Failed to delete topic");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {children ? (
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      ) : null}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your{" "}
            <span className="font-bold">{title}</span> topic and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit} disabled={isLoading}>
            {isLoading ? <Spinner /> : ""}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTopicButton;
