"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { updateResource } from "@/server/resources/write";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.url("Invalid URL"),
  type: z.string().optional(),
});

export default function UpdateResourceButton({
  id,
  title,
  url,
  type,
  open,
  setOpen,
  children,
}: {
  id: number;
  topicId: number;
  title?: string;
  url?: string;
  type?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpenState = open ?? internalOpen;
  const setIsOpen = setOpen ?? setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: title || "", url: url || "", type: type || "" },
  });

  useEffect(() => {
    form.reset({ title: title || "", url: url || "", type: type || "" });
  }, [title, url, type, form]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      await updateResource(id, values);
      toast.success("Resource updated");
      router.refresh();
      setIsOpen(false);
    } catch {
      toast.error("Failed to update resource");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenState} onOpenChange={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
          <DialogDescription>Edit this resource.</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>URL</FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
