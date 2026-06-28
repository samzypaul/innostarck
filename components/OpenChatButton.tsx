"use client";

import { openChat } from "@/lib/chat-bus";

type OpenChatButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export default function OpenChatButton({ className, children }: OpenChatButtonProps) {
  return (
    <button type="button" className={className} onClick={openChat}>
      {children}
    </button>
  );
}
