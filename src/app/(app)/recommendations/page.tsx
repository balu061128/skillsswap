
"use client";

import { RecommendationsClient } from "./_components/recommendations-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/services/user";
import type { User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecommendationsPage() {
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
               <div className="flex items-center gap-4">
                  <Lightbulb className="w-8 h-8"/>
                  <div>
                      <Skeleton className="h-7 w-48" />
                      <Skeleton className="h-4 w-72 mt-2" />
                  </div>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-5 w-1/2" />
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <Skeleton className="h-12 w-64" />
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
