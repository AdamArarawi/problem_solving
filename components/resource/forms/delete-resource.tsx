"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteResource } from "@/server/resources/write";

export default function DeleteResourceButton({
  id,
  title,
  open,
  setOpen,
  children,
}: {
  id: number;
  title?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpenState = open ?? internalOpen;
  const setIsOpen = setOpen ?? setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteResource(id);
      toast.success("Resource deleted");
      setIsOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to delete resource");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpenState} onOpenChange={setIsOpen}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the resource <strong>{title}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
            {isLoading ? <Spinner /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
