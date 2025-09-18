
"use client";

import { MatchingClient } from "./_components/matching-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/user";
import type { User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function MatchingPage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!authUser) {
      // This case should be handled by the layout, but as a fallback:
      setLoading(false);
      return;
    }

    async function fetchUser() {
      const profile = await getUserProfile(authUser.uid);
      if (profile) {
        setCurrentUser(profile);
      }
      setLoading(false);
    }
    fetchUser();
  }, [authUser, authLoading]);

  if (loading || authLoading) {
    return (
       <div className="flex items-center justify-center py-12">
           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground"/>
       </div>
    );
  }

  if (!currentUser) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Not Found</CardTitle>
                <CardDescription>We couldn't load your profile. Please try again later.</CardDescription>
            </CardHeader>
        </Card>
    );
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
