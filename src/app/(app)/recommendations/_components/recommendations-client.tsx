"use client";

import { useState } from "react";
import { recommendContent, RecommendContentOutput } from "@/ai/flows/content-recommendations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, BookOpen } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { User } from "@/lib/types";
import Link from "next/link";

interface RecommendationsClientProps {
  currentUser: User;
}

export function RecommendationsClient({ currentUser }: RecommendationsClientProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendContentOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRecommend = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const input = {
        skills: currentUser.skillsToTeach,
        interests: currentUser.skillsToLearn,
      };

      const response = await recommendContent(input);

      setResult(response);
    } catch (e) {
      setError("Failed to get recommendations. Please try again.");
      console.error(e);
    }
    setLoading(false);
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
            <CardTitle>Your Learning Profile</CardTitle>
            <CardDescription>Our AI will use these skills and interests to find content for you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            <p className="text-sm font-medium">Your Skills:{' '}
                <span className="font-normal text-muted-foreground">{currentUser.skillsToTeach.join(", ") || "No skills added yet."}</span>
            </p>
            <p className="text-sm font-medium">Your Interests:{' '}
                <span className="font-normal text-muted-foreground">{currentUser.skillsToLearn.join(", ") || "No interests added yet."}</span>
            </p>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button size="lg" onClick={handleRecommend} disabled={loading || currentUser.skillsToLearn.length === 0}>
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          Generate Recommendations
        </Button>
      </div>
       {currentUser.skillsToLearn.length === 0 && (
         <p className="text-center text-sm text-muted-foreground -mt-4">
            Please add skills you want to learn in your <Link href="/settings" className="underline">profile settings</Link> to get recommendations.
        </p>
       )}


      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>Your Curated Learning Path</CardTitle>
            <CardDescription>Here are some resources we think you'll love.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-2 rounded-full mt-1">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-sm text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
