
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "../_components/profile-client";
import { useParams } from "next/navigation";

export default function OtherUserProfilePage() {
    const params = useParams();
    const { user: currentUser } = useAuth();
    const userId = params.userId as string;

    // The layout now handles the loading state, so we can assume currentUser and userId are available.
    // If not, the layout would have already redirected to login.

    const isCurrentUser = currentUser ? currentUser.uid === userId : false;

    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
