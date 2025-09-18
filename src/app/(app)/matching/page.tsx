
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

export default function MatchingPage() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!authUser) {
      setLoading(false);
      return;
    }

    async function fetchUser() {
      setLoading(true);
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
       <div className="w-full space-y-8">
          <Card className="mb-8">
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </CardHeader>
          </Card>
          <div className="flex justify-center">
            <Skeleton className="h-12 w-48" />
          </div>
       </div>
    );
  }

  if (!currentUser) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Not Found</CardTitle>
                <CardDescription>We couldn't load your profile. Please add your skills and interests in Settings to use this feature.</CardDescription>
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
