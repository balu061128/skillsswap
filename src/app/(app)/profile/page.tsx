
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "./_components/profile-client";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const { user: authUser, currentUser, loading } = useAuth();
    
    // Check for a userId in the query params first.
    const userIdFromParams = searchParams.get('userId');
    
    // If we're viewing someone else's profile, use their ID.
    // If not, use the current logged-in user's ID.
    const userId = userIdFromParams || authUser?.uid;
    
    // Determine if the profile being viewed is the current logged-in user's profile.
    const isCurrentUser = authUser ? authUser.uid === userId : false;
    
    if (loading || !userId) {
       return (
        <div className="flex h-screen w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        );
    }
    
    // When viewing our own profile, we can pass the already-loaded currentUser object
    if (isCurrentUser && currentUser) {
         return <ProfileClient user={currentUser} isCurrentUser={true} />;
    }
    
    // When viewing another user's profile, we fetch it by ID
    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
