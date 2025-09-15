
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "./_components/profile-client";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const { user: currentUser, loading } = useAuth();
    
    // Check for a userId in the query params first.
    const userIdFromParams = searchParams.get('userId');
    
    // If we're viewing someone else's profile, use their ID.
    // If not, use the current logged-in user's ID.
    const userId = userIdFromParams || currentUser?.uid;
    
    // Show a skeleton loader while authentication is in progress or if we don't have a userId yet.
    // This is the key fix to prevent rendering with an undefined ID.
    if (loading || !userId) {
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
    
    // Determine if the profile being viewed is the current logged-in user's profile.
    const isCurrentUser = currentUser ? currentUser.uid === userId : false;

    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
