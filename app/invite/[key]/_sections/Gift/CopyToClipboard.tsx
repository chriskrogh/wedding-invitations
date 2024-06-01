"use client";

import { Clipboard } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";

export const CopyToClipboard: React.FC<{ value: string }> = ({ value }) => {
  const { toast } = useToast();
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        toast({ title: "Copied to clipboard!", description: value });
      }}
    >
      <Clipboard />
    </button>
  );
};
