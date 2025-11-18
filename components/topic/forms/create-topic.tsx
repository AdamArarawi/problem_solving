"use client";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../../ui/dialog";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../../ui/field";
import { Input } from "../../ui/input";
import { useState } from "react";
import { createTopic } from "@/server/topics/write";
import { toast } from "sonner";
import { Spinner } from "../../ui/spinner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  content: z.string().optional(),
});

const CreateTopicButton = ({
  parent,
  open,
  setOpen,
  children,
}: {
  parent?: number;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);

  // نختار أي state نستخدمه
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = setOpen !== undefined ? setOpen : setInternalOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await createTopic({
        ...values,
        parentId: parent,
      });

      if (response.success) {
        form.reset();
        toast.success("Topic created successfully");
        setIsOpen(false);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed to create topic");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children ? (
        <>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Topic</DialogTitle>
          <DialogDescription>
            Create a new topic to store your notes.
          </DialogDescription>
        </DialogHeader>

        {/* دمج الـ form مع DialogFooter */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    aria-invalid={fieldState.invalid}
                    placeholder="My Topic"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    aria-invalid={fieldState.invalid}
                    placeholder="Description"
                    autoComplete="off"
                    className="min-h-32 max-h-64 resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="content">Content</FieldLabel>
                  <Textarea
                    {...field}
                    id="content"
                    aria-invalid={fieldState.invalid}
                    placeholder="Content"
                    autoComplete="off"
                    className="min-h-32 max-h-64 resize-none"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTopicButton;
