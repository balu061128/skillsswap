import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { ChatClient } from "./_components/chat-client";

export default function MessagesPage() {
  return (
    <div className="w-full h-[calc(100vh-100px)]">
        <ChatClient />
    </div>
  );
}
