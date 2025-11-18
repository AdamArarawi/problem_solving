"use client";
import { useState } from "react";
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
import { deleteProblem } from "@/server/problems/write";

export default function DeleteProblemButton({
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
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpenState = open ?? internalOpen;
  const setIsOpen = setOpen ?? setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProblem(id);
      toast.success("Problem deleted");
      setIsOpen(false);
    } catch {
      toast.error("Failed to delete problem");
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
            This will permanently delete the problem <strong>{title}</strong>.
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
