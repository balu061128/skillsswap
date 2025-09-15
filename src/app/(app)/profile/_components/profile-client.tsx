
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Edit, MessageSquare } from "lucide-react";
import { getUserProfile } from "@/services/user";
import type { User } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileClient({ userId, isCurrentUser }: { userId: string, isCurrentUser: boolean }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (!userId) {
        // This case should be handled by the parent component now, but as a safeguard:
        setError("No user ID provided.");
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError(null);
      try {
        const userProfile = await getUserProfile(userId);
        if (userProfile) {
          setUser(userProfile);
        } else {
          setError("Could not find user profile.");
        }
      } catch (err) {
        setError("An unexpected error occurred while fetching user data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) {
    return <ProfileSkeleton />;
  }
  
  if (error) {
      return (
          <Card>
              <CardHeader><CardTitle>Error</CardTitle></CardHeader>
              <CardContent><p>{error}</p></CardContent>
          </Card>
      );
  }

  if (!user) {
    return (
        <Card>
            <CardHeader><CardTitle>User Not Found</CardTitle></CardHeader>
            <CardContent><p>This user profile could not be located.</p></CardContent>
        </Card>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col items-center space-y-4">
          <Card className="w-full">
            <CardContent className="flex flex-col items-center pt-6 space-y-4">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center justify-center text-muted-foreground mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{user.rating?.toFixed(1) ?? '0.0'} ({user.reviews ?? 0} reviews)</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground px-4">{user.bio}</p>
              <div className="w-full flex gap-2 pt-2">
                {isCurrentUser ? (
                  <Button asChild className="flex-1">
                    <Link href="/settings">
                      <Edit className="mr-2 h-4 w-4" /> Edit Profile
                    </Link>
                  </Button>
                ) : (
                  <Button className="flex-1">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Skills to Teach</CardTitle>
              <CardDescription>These are the skills {isCurrentUser ? 'I' : 'they'} can help you with.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {user.skillsToTeach && user.skillsToTeach.length > 0 ? user.skillsToTeach.map(skill => (
                <Badge key={skill} variant="default" className="text-sm py-1 px-3">{skill}</Badge>
              )) : <p className="text-sm text-muted-foreground">No skills to teach yet.</p>}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills to Learn</CardTitle>
              <CardDescription>{isCurrentUser ? 'I\'m' : 'They are'} currently interested in learning these skills.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {user.skillsToLearn && user.skillsToLearn.length > 0 ? user.skillsToLearn.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">{skill}</Badge>
              )) : <p className="text-sm text-muted-foreground">No skills to learn yet.</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


function ProfileSkeleton() {
    return (
        <div className="container mx-auto p-4 md:p-6">
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 flex flex-col items-center space-y-4">
            <Card className="w-full">
                <CardContent className="flex flex-col items-center pt-6 space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="text-center space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="w-full flex gap-2 pt-2">
                    <Skeleton className="h-10 flex-1" />
                </div>
                </CardContent>
            </Card>
            </div>
            
            <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-20" />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-32" />
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    );
}

    