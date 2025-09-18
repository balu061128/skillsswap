
"use client";

import { useState } from "react";
import { skillMatching, SkillMatchingOutput } from "@/ai/flows/skill-matching";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Shuffle, UserCheck, ArrowRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { User } from "@/lib/types";

// This component now receives the full user object
export function MatchingClient({ currentUser }: { currentUser: User }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillMatchingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const input = {
        userSkills: currentUser.skillsToTeach,
        userInterests: currentUser.skillsToLearn,
        pastInteractions: "No past interactions recorded.",
        statedNeeds: `I want to learn skills related to ${currentUser.skillsToLearn.join(", ")}.`,
      };
      
      const response = await skillMatching(input);
      setResult(response);
    } catch (e) {
      setError("Failed to find matches. Please try again later.");
      console.error(e);
    }
    setLoading(false);
  };
  
  // The AI generates user profiles, so we don't need a mock database.
  // We'll construct the partner object from the AI's response.
  const getPartnerDetailsFromAI = (partnerId: string, reasoning: string) => {
    // This is a simplified example. A more robust solution might involve the AI returning more structured data.
    return {
        id: partnerId,
        name: partnerId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // e.g. 'user_jane_doe' -> 'User Jane Doe'
        avatar: `https://picsum.photos/seed/${partnerId}/80/80`,
        // We infer skills and interests from the reasoning text for demonstration.
        // In a real app, the AI would ideally return this in a structured format.
        skills: reasoning.match(/can teach (.*?)\./)?.[1].split(', ') || ['AI Suggested Skill'],
        interests: reasoning.match(/interested in (.*?)\./)?.[1].split(', ') || ['AI Suggested Interest'],
    };
  };

  return (
    <div>
      <div className="flex justify-center mb-8">
        <Button size="lg" onClick={handleMatch} disabled={loading || currentUser.skillsToTeach.length === 0 || currentUser.skillsToLearn.length === 0}>
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Shuffle className="mr-2 h-5 w-5" />
          )}
          Find My Matches
        </Button>
         {(currentUser.skillsToTeach.length === 0 || currentUser.skillsToLearn.length === 0) && (
            <p className="text-center text-sm text-muted-foreground mt-2">
                Please add skills you can teach and skills you want to learn in your <Link href="/settings" className="underline">profile settings</Link> to find matches.
            </p>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-8 animate-fade-in-up">
            <Alert>
                <UserCheck className="h-4 w-4" />
                <AlertTitle>AI Recommendation</AlertTitle>
                <AlertDescription>{result.reasoning}</AlertDescription>
            </Alert>
            <div className="grid gap-6 md:grid-cols-2">
            {result.suggestedPartners.map(partnerId => {
                const partner = getPartnerDetailsFromAI(partnerId, result.reasoning);
                return (
                    <Card key={partner.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                           <Avatar className="h-16 w-16">
                             <AvatarImage src={partner.avatar} alt={partner.name} data-ai-hint="person face" />
                             <AvatarFallback>{partner.name.substring(0, 2)}</AvatarFallback>
                           </Avatar>
                           <div>
                            <CardTitle>{partner.name}</CardTitle>
                            <CardDescription>Ideal partner for you.</CardDescription>
                           </div>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold text-sm mb-2">Skills they can teach:</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {partner.skills.map(skill => <Badge key={skill} variant="default">{skill}</Badge>)}
                            </div>
                             <p className="font-semibold text-sm mb-2">Their interests:</p>
                            <div className="flex flex-wrap gap-2">
                                {partner.interests.map(interest => <Badge key={interest} variant="secondary">{interest}</Badge>)}
                            </div>
                        </CardContent>
                        <CardFooter>
                             <Button asChild className="w-full">
                                <Link href={`/profile?userId=${partner.id}`}>View Profile <ArrowRight className="ml-2 h-4 w-4"/></Link>
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
            </div>
        </div>
      )}
    </div>
  );
}
