import { cn } from "@/lib/utils";
import { ArrowRightLeft } from "lucide-react";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <ArrowRightLeft className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground font-headline">
        Skill Swap
      </span>
    </div>
  );
}
