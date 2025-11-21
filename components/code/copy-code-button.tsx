"use client";

import { Clipboard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function CopyCodeButton({ content }: { content: string }) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-7"
      onClick={() => copyToClipboard(content)}
    >
      {isCopied ? <Check /> : <Clipboard />}
    </Button>
  );
}
