

"use client";

import { RecommendationsClient } from "./_components/recommendations-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";


export default function RecommendationsPage() {
  const { currentUser, loading } = useAuth();

  if (loading || !currentUser) {
    return <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Lightbulb className="w-8 h-8"/>
                <div>
                    <CardTitle>AI Content Curator</CardTitle>
                    <CardDescription>
                    Get learning materials and resources tailored to your skills and interests.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      <RecommendationsClient currentUser={currentUser} />
    </div>
  );
}
