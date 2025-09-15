import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Edit, MessageSquare } from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Alex Doe",
    avatarUrl: "https://picsum.photos/seed/user-avatar/128/128",
    bio: "Full-stack developer with a passion for creative coding and building beautiful user experiences. I love teaching React and learning about 3D graphics.",
    skillsToTeach: ["React", "TypeScript", "Node.js", "CSS Animations"],
    skillsToLearn: ["Three.js", "Blender", "GLSL Shaders", "Python for Data Science"],
    rating: 4.8,
    reviews: 23,
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col items-center space-y-4">
          <Card className="w-full">
            <CardContent className="flex flex-col items-center pt-6 space-y-4">
              <Avatar className="h-32 w-32 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <div className="flex items-center justify-center text-muted-foreground mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{user.rating} ({user.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground px-4">{user.bio}</p>
              <div className="w-full flex gap-2 pt-2">
                 <Button className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
                <Button variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Skills to Teach</CardTitle>
              <CardDescription>These are the skills I can help you with.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {user.skillsToTeach.map(skill => (
                <Badge key={skill} variant="default" className="text-sm py-1 px-3">{skill}</Badge>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills to Learn</CardTitle>
              <CardDescription>I'm currently interested in learning these skills.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {user.skillsToLearn.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">{skill}</Badge>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex gap-4">
                 <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/reviewer1/40/40" alt="Reviewer" data-ai-hint="person smiling" />
                    <AvatarFallback>OM</AvatarFallback>
                 </Avatar>
                 <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Olivia Martin</p>
                        <div className="flex text-yellow-400">
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">"Alex is an amazing teacher! Explained complex React concepts very clearly."</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/reviewer2/40/40" alt="Reviewer" data-ai-hint="man face"/>
                    <AvatarFallback>JL</AvatarFallback>
                 </Avatar>
                 <div>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold">Jackson Lee</p>
                        <div className="flex text-yellow-400">
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                          <Star className="w-4 h-4 fill-current"/>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">"Great session on Node.js performance. Looking forward to the next one."</p>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
