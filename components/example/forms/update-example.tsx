"use client";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { updateExample } from "@/server/examples/write";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  code: z.string().optional(),
  output: z.string().optional(),
  explanation: z.string().optional(),
});

export default function UpdateExampleButton({
  id,
  title,
  code,
  output,
  explanation,
  open,
  setOpen,
  children,
}: {
  id: number;
  title?: string;
  code?: string;
  output?: string;
  explanation?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpenState = open ?? internalOpen;
  const setIsOpen = setOpen ?? setInternalOpen;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: title || "",
      code: code || "",
      output: output || "",
      explanation: explanation || "",
    },
  });

  useEffect(() => {
    form.reset({
      title: title || "",
      code: code || "",
      output: output || "",
      explanation: explanation || "",
    });
  }, [title, code, output, explanation, form]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      await updateExample(id, values);
      toast.success("Example updated");
      setIsOpen(false);
    } catch {
      toast.error("Failed to update example");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenState} onOpenChange={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Example</DialogTitle>
          <DialogDescription>Edit this example.</DialogDescription>
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
              name="code"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Code</FieldLabel>
                  <Textarea {...field} className="max-h-32 resize-none" />
                </Field>
              )}
            />
            <Controller
              name="output"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Output</FieldLabel>
                  <Textarea {...field} className="max-h-32 resize-none" />
                </Field>
              )}
            />
            <Controller
              name="explanation"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Explanation</FieldLabel>
                  <Textarea {...field} className="max-h-32 resize-none" />
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
