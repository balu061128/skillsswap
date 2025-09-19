
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Video, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/lib/types";
import { MessageSquare } from "lucide-react";


const conversations: User[] = []
const messagesMock: any = {}


export function ChatClient() {
  const { user: currentUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setMessages(messagesMock[user.id as keyof typeof messagesMock] || []);
  }

  const handleSendMessage = () => {
    if (message.trim() && currentUser) {
        // In a real app, this would call a server action to save the message
        const newMessage: any = { id: `m${Date.now()}`, sender: 'currentUser', text: message };
        setMessages(prev => [...prev, newMessage]);
        setMessage("");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-full border rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="border-r bg-muted/40 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold tracking-tight">Messages</h2>
           <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-8 bg-background" />
            </div>
        </div>
        <div className="flex-1 overflow-auto">
            {conversations.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">
                    No conversations yet.
                </div>
            ) : (
                <nav className="p-2 space-y-1">
                    {conversations.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className={cn(
                        "w-full text-left flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted",
                        selectedUser?.id === user.id ? "bg-muted text-primary" : ""
                        )}
                    >
                        <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 truncate">
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.lastMessage}</p>
                        </div>
                    </button>
                    ))}
                </nav>
            )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col h-full">
        {selectedUser ? (
          <>
            <div className="flex items-center gap-4 p-4 border-b">
                <Avatar>
                    <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="person face" />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-lg">{selectedUser.name}</p>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg: any) => (
                  <div key={msg.id} className={cn("flex items-end gap-2", msg.sender === 'currentUser' ? "justify-end" : "justify-start")}>
                      {msg.sender !== 'currentUser' && <Avatar className="h-8 w-8"><AvatarImage src={selectedUser.avatarUrl} /></Avatar>}
                      <div className={cn("max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2", msg.sender === 'currentUser' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                          <p>{msg.text}</p>
                      </div>
                       {msg.sender === 'currentUser' && currentUser && <Avatar className="h-8 w-8"><AvatarImage src={currentUser.photoURL || undefined} /></Avatar>}
                  </div>
              ))}
            </div>

            <div className="p-4 border-t mt-auto bg-background">
                <div className="relative">
                    <Input 
                        placeholder="Type your message..." 
                        className="pr-12" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                        size="icon" 
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
             <MessageSquare className="h-16 w-16" />
             <p className="mt-4 text-lg">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
