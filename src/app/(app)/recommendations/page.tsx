
"use client";

import { RecommendationsClient } from "./_components/recommendations-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function RecommendationsPage() {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    // This should technically be handled by the main layout's loader,
    // but it's good practice to have a fallback.
    return null;
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
