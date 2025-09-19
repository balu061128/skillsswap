

"use client";

import { RecommendationsClient } from "./_components/recommendations-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
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

export default function RecommendationsPage() {
  const currentUser = mockUser;

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
            <div className="flex items-center gap-4">
                <Lightbulb className="w-8 h-8"/>
                <div>
                    <CardTitle>AI Content Curator</CardTitle>
                    <CardDescription>
                    Get learning materials and resources tailored to your skills and interests.
                    </CardDescription>
                </div>
            </div>
        </CardHeader>
      </Card>
      <RecommendationsClient currentUser={currentUser} />
    </div>
  );
}
