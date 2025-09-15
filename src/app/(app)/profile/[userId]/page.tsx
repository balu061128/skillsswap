
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "../_components/profile-client";
import { useParams } from "next/navigation";

export default function OtherUserProfilePage() {
    const params = useParams();
    const { user: currentUser } = useAuth();
    const userId = params.userId as string;

    if (!userId) {
        return <div>Loading...</div>; // Or a more sophisticated loading state
    }
    
    // Check if the profile being viewed is the current user's profile
    const isCurrentUser = currentUser ? currentUser.uid === userId : false;

    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
