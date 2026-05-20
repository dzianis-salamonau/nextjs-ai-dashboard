import { ChatInterface } from "@/components/chat/chat-interface";
import { DashboardHeader } from "@/components/dashboard/header";

export const metadata = {
  title: "AI Chat",
};

export default function ChatPage() {
  return (
    <>
      <DashboardHeader
        title="AI Chat"
        description="Streaming assistant with markdown and file context."
      />
      <div className="flex-1 overflow-hidden p-6 pt-0">
        <ChatInterface />
      </div>
    </>
  );
}
