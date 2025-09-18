
"use client";

import { MatchingClient } from "./_components/matching-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function MatchingPage() {
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
