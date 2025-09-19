

"use client";

import { MatchingClient } from "./_components/matching-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export default function MatchingPage() {
  const { currentUser, loading } = useAuth();

  if (loading || !currentUser) {
    return <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI-Powered Skill Matching</CardTitle>
          <CardDescription>
            Discover your ideal learning partners. Our AI analyzes your profile to find the best matches. Based on your skills:{' '}
            <span className="font-semibold text-primary">{currentUser.skillsToTeach.join(", ") || 'N/A'}</span> and interests:{' '}
            <span className="font-semibold text-primary">{currentUser.skillsToLearn.join(", ") || 'N/A'}</span>.
          </CardDescription>
        </CardHeader>
      </Card>
      <MatchingClient currentUser={currentUser} />
    </div>
  );
}
