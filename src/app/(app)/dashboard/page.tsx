import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Users, Lightbulb, CalendarCheck, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your Skills</CardDescription>
            <CardTitle className="text-4xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +2 from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sessions Completed</CardDescription>
            <CardTitle className="text-4xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +30% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Matches</CardDescription>
            <CardTitle className="text-4xl">5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              You have 5 new potential partners.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Rating</CardDescription>
            <CardTitle className="text-4xl">4.8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Based on your last 5 sessions.
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your next learning and teaching sessions.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://picsum.photos/seed/user1/40/40" alt="Avatar" data-ai-hint="person face" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Learning: Advanced React Hooks</p>
                <p className="text-sm text-muted-foreground">with Olivia Martin</p>
              </div>
              <div className="ml-auto font-medium">Tomorrow, 2 PM</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="https://picsum.photos/seed/user2/40/40" alt="Avatar" data-ai-hint="woman smiling"/>
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Teaching: Intro to Figma</p>
                <p className="text-sm text-muted-foreground">with Jackson Lee</p>
              </div>
              <div className="ml-auto font-medium">Oct 25, 4 PM</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended For You</CardTitle>
             <CardDescription>AI-powered recommendations to boost your growth.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className=" flex items-center gap-4">
                <div className="bg-muted p-2 rounded-md">
                    <Users className="h-6 w-6 text-muted-foreground"/>
                </div>
                <div className="grid gap-1">
                    <p className="text-sm font-medium">New Matches Found</p>
                    <p className="text-sm text-muted-foreground">We found 3 new partners for "Python".</p>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/matching">View<ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
            </div>
            <div className=" flex items-center gap-4">
                <div className="bg-muted p-2 rounded-md">
                    <Lightbulb className="h-6 w-6 text-muted-foreground"/>
                </div>
                <div className="grid gap-1">
                    <p className="text-sm font-medium">Content for "Data Science"</p>
                    <p className="text-sm text-muted-foreground">New articles and courses available.</p>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <Link href="/recommendations">Explore<ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>An overview of your current skill set.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">Figma</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">Data Science</Badge>
            <Badge variant="default">+ Add Skill</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
