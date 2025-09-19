

"use client";

import { MatchingClient } from "./_components/matching-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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


export default function MatchingPage() {
  const currentUser = mockUser;

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI-Powered Skill Matching</CardTitle>
          <CardDescription>
            Discover your ideal learning partners. Our AI analyzes your profile to find the best matches. Based on your skills:{' '}
            <span className="font-semibold text-primary">{currentUser.skillsToTeach.join(", ") || 'N/A'}</span> and interests:{' '}
            <span className="font-semibold text-primary">{currentUser.skillsToLearn.join(", ") || 'N/A'}</span>.
          </CardDescription>
        </CardHeader>
      </Card>
      <MatchingClient currentUser={currentUser} />
    </div>
  );
}
