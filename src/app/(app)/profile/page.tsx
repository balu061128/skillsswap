
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
    // If not viewing someone else's profile, use the current user's ID.
    const userId = userIdFromParams || currentUser?.uid;
    
    if (loading || !userId) {
        // A simple skeleton while auth is loading or userId is not yet available
        return (
             <div className="w-full p-6 space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
            </div>
        );
    }
    
    const isCurrentUser = currentUser ? currentUser.uid === userId : false;

    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
