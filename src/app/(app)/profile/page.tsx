

"use client";

import { ProfileClient } from "./_components/profile-client";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";


export default function ProfilePage() {
    const { currentUser, loading } = useAuth();
    const searchParams = useSearchParams();
    
    if (loading || !currentUser) {
        return <div className="flex h-full w-full items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }
    
    const userIdFromParams = searchParams.get('userId');
    const userId = userIdFromParams || currentUser.id;
    const isCurrentUser = !userIdFromParams || userIdFromParams === currentUser.id;
    
    if (isCurrentUser) {
         return <ProfileClient user={currentUser} isCurrentUser={true} />;
    }
    
    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
