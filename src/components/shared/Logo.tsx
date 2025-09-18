import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
       <div className="flex flex-col">
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6H20L15 1" stroke="#2563EB" strokeWidth="2"/>
            <path d="M24 6H4L9 11" stroke="#16A34A" strokeWidth="2"/>
          </svg>
       </div>
      <span className="text-xl font-bold tracking-tight">
        <span style={{color:"hsl(var(--primary))"}}>Skill</span>
        <span style={{color:"#16A34A"}}>Collab</span>
      </span>
    </div>
  );
}
