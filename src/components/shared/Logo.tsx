import { cn } from "@/lib/utils";
import { Handshake } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <div className="p-2 bg-primary/20 rounded-lg">
          <Handshake className="h-6 w-6 text-primary" />
       </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Skill Swap
      </span>
    </div>
  );
}
