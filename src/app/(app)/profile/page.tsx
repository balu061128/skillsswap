
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "./_components/profile-client";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
    const params = useParams();
    const { user: currentUser, loading } = useAuth();
    
    // The userId could be from the URL for other users, or from auth for the current user.
    const userIdFromParams = params.userId as string;
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

    
