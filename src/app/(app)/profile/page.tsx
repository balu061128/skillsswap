
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "./_components/profile-client";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const params = useParams();
    const { user: currentUser, loading } = useAuth();
    
    // The userId could be from the URL for other users, or from auth for the current user.
    const userIdFromParams = params.userId as string;
    const userId = userIdFromParams || currentUser?.uid;
    
    if (loading) {
        // A simple skeleton while auth is loading, ProfileClient has its own more detailed skeleton
        return (
            <div className="w-full p-6">
                <div className="h-32 w-full animate-pulse rounded-md bg-muted"></div>
            </div>
        );
    }
    
    if (!userId) {
        // This case should be rare due to layout protection, but it's a good safeguard.
        return <div>Could not determine user to display.</div>
    }

    const isCurrentUser = currentUser ? currentUser.uid === userId : false;

    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}

    