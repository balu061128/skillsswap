import { MatchingClient } from "./_components/matching-client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MatchingPage() {
  const currentUser = {
    skills: ["React", "TypeScript", "Next.js"],
    interests: ["3D Graphics", "Python", "Data Visualization"],
  };

  return (
    <div className="w-full">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>AI-Powered Skill Matching</CardTitle>
          <CardDescription>
            Discover your ideal learning partners. Our AI analyzes your profile against others to find the best matches for skill exchange. Based on your skills: <span className="font-semibold text-primary">{currentUser.skills.join(", ")}</span> and interests: <span className="font-semibold text-primary">{currentUser.interests.join(", ")}</span>.
          </CardDescription>
        </CardHeader>
      </Card>
      <MatchingClient currentUser={currentUser} />
    </div>
  );
}
