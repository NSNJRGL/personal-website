export type ChatRole = "user" | "assistant";

export type ChatSource = {
  id: string;
  title: string;
  type: "profile" | "experience" | "project" | "skills" | "links" | "faq";
  url?: string;
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt?: string;
  sources?: ChatSource[];
  isStreaming?: boolean;
};
