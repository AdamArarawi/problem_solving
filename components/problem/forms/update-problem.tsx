"use client";
import { useEffect, useState } from "react";
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
import { updateProblem } from "@/server/problems/write";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.url("Invalid URL"),
  source: z.string().optional(),
  difficulty: z.string().optional(),
});

export default function UpdateProblemButton({
  id,
  title,
  url,
  source,
  difficulty,
  open,
  setOpen,
  children,
}: {
  id: number;
  title?: string;
  url?: string;
  source?: string;
  difficulty?: string;
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
      url: url || "",
      source: source || "",
      difficulty: difficulty || "",
    },
  });

  useEffect(() => {
    form.reset({
      title: title || "",
      url: url || "",
      source: source || "",
      difficulty: difficulty || "",
    });
  }, [title, url, source, difficulty, form]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      await updateProblem(id, values);
      toast.success("Problem updated");
      setIsOpen(false);
    } catch {
      toast.error("Failed to update problem");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenState} onOpenChange={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Problem</DialogTitle>
          <DialogDescription>Edit this problem.</DialogDescription>
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
              name="source"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Source</FieldLabel>
                  <Input {...field} />
                </Field>
              )}
            />
            <Controller
              name="difficulty"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Difficulty</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
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
