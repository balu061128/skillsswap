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

const MOCK_USERS = [
    { id: 'user_sara', name: 'Sara Lance', avatar: 'https://picsum.photos/seed/sara/80/80', skills: ['Python', 'Data Visualization', 'Machine Learning'], interests: ['Web Development', 'React'] },
    { id: 'user_john', name: 'John Diggle', avatar: 'https://picsum.photos/seed/john/80/80', skills: ['Cybersecurity', 'Networking'], interests: ['Project Management'] },
    { id: 'user_felicity', name: 'Felicity Smoak', avatar: 'https://picsum.photos/seed/felicity/80/80', skills: ['Three.js', 'Blender', 'WebSockets'], interests: ['Game Development'] },
];

export function MatchingClient({ currentUser }: { currentUser: { skills: string[], interests: string[] } }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillMatchingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // In a real app, you might fetch more detailed info
      const input = {
        userSkills: currentUser.skills,
        userInterests: currentUser.interests,
        pastInteractions: "No past interactions recorded.",
        statedNeeds: `I want to learn skills related to ${currentUser.interests.join(", ")}.`,
      };
      
      // MOCKING the AI call to avoid Genkit setup for this UI build.
      // In a real scenario, you would uncomment the line below.
      // const response = await skillMatching(input);
      
      const MOCK_RESPONSE: SkillMatchingOutput = {
          suggestedPartners: ['user_felicity', 'user_sara'],
          reasoning: "Felicity is a strong match due to her expertise in Three.js and Blender, directly aligning with your interest in 3D graphics. Sara's skills in Python and Data Visualization also match your stated interests, offering a different but valuable learning path."
      };
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      const response = MOCK_RESPONSE;

      setResult(response);
    } catch (e) {
      setError("Failed to find matches. Please try again later.");
      console.error(e);
    }
    setLoading(false);
  };
  
  const getMatchedUserDetails = (userId: string) => MOCK_USERS.find(u => u.id === userId);

  return (
    <div>
      <div className="flex justify-center mb-8">
        <Button size="lg" onClick={handleMatch} disabled={loading}>
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Shuffle className="mr-2 h-5 w-5" />
          )}
          Find My Matches
        </Button>
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
                const partner = getMatchedUserDetails(partnerId);
                if (!partner) return null;
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
                                <Link href="/profile">View Profile <ArrowRight className="ml-2 h-4 w-4"/></Link>
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
