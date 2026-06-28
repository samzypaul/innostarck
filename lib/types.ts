export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type CollectedLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectSummary: string;
};

export type ChatApiResponse = {
  reply: string;
  collected: CollectedLead;
  complete: boolean;
  options: string[];
  requestPhone: boolean;
  error?: string;
};

export const emptyLead: CollectedLead = {
  name: "",
  email: "",
  phone: "",
  company: "",
  projectSummary: "",
};
