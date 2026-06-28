// Tiny event bus so any element on the page (e.g. the footer "Chat now" button)
// can open the floating AI assistant without a shared React context.

export const OPEN_CHAT_EVENT = "innostarck:open-chat";

export function openChat() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_CHAT_EVENT));
  }
}
