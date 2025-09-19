
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Terminal } from "lucide-react";

export default function CollabPage() {
  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Terminal className="w-8 h-8"/>
                <div>
                    <CardTitle>Code Collab</CardTitle>
                    <CardDescription>
                    A real-time collaborative environment for coding and teaching.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-96 border-2 border-dashed rounded-lg">
                <Terminal className="w-16 h-16 text-muted-foreground" />
                <h2 className="mt-4 text-xl font-semibold">Collaborative Coding Playground</h2>
                <p className="mt-2 text-sm text-muted-foreground">This feature is coming soon. Get ready to code together in real-time!</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
