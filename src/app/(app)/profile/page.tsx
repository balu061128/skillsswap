

"use client";

import { ProfileClient } from "./_components/profile-client";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import type { User } from "@/lib/types";

const mockUser: User = {
    id: "mock-user-123",
    name: "Alex Doe",
    avatarUrl: "https://picsum.photos/seed/alex-doe/128/128",
    bio: "Enthusiastic learner and passionate teacher of web technologies. Let's connect and grow together!",
    skillsToTeach: ["React", "TypeScript", "Node.js"],
    skillsToLearn: ["Python", "Data Science", "Figma"],
    rating: 4.8,
    reviews: 23,
};


export default function ProfilePage() {
    const searchParams = useSearchParams();
    
    const userIdFromParams = searchParams.get('userId');
    const userId = userIdFromParams || mockUser.id;
    const isCurrentUser = !userIdFromParams || userIdFromParams === mockUser.id;
    
    // When viewing our own profile, we can pass the mock user object
    if (isCurrentUser) {
         return <ProfileClient user={mockUser} isCurrentUser={true} />;
    }
    
    // When viewing another user's profile, we fetch it by ID (or use a different mock)
    return <ProfileClient userId={userId} isCurrentUser={isCurrentUser} />;
}
