"use client";
import { useState } from "react";
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
import { createExample } from "@/server/examples/write";
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
  code: z.string().optional(),
  language: z.string().optional(),
  output: z.string().optional(),
  explanation: z.string().optional(),
});

export default function CreateExampleButton({
  topicId,
  children,
}: {
  topicId: number;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      code: "",
      language: "py",
      output: "",
      explanation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      await createExample({ ...values, topicId });
      toast.success("Example created");
      form.reset();
      setIsOpen(false);
    } catch {
      toast.error("Failed to create example");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Example</DialogTitle>
          <DialogDescription>
            Add a new code example to this topic.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="max-h-[400px] overflow-auto pr-4">
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
              name="language"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Language</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="py">Python</SelectItem>
                      <SelectItem value="js">JavaScript</SelectItem>
                      <SelectItem value="ts">TypeScript</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="code"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Code</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Code (optional)"
                    className="max-h-32 resize-none"
                  />
                </Field>
              )}
            />
            <Controller
              name="output"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Output</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Output (optional)"
                    className="max-h-32 resize-none"
                  />
                </Field>
              )}
            />
            <Controller
              name="explanation"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Explanation</FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Explanation (optional)"
                    className="max-h-32 resize-none"
                  />
                </Field>
              )}
            />
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Spinner /> : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
