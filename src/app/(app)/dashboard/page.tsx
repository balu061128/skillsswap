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
            <CardTitle className="text-4xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Add skills in your profile.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Sessions Completed</CardDescription>
            <CardTitle className="text-4xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              No sessions completed yet.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Matches</CardDescription>
            <CardTitle className="text-4xl">0</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Find partners in Skill Matching.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg. Rating</CardDescription>
            <CardTitle className="text-4xl">N/A</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              No ratings yet.
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
            <p className="text-sm text-muted-foreground">No upcoming sessions. Go to the <Link href="/schedule" className="underline">Schedule</Link> page to add one.</p>
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
                    <p className="text-sm text-muted-foreground">Find partners for your skills.</p>
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
                    <p className="text-sm font-medium">Content Recommendations</p>
                    <p className="text-sm text-muted-foreground">Explore AI-curated content.</p>
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
            <p className="text-sm text-muted-foreground">No skills added yet. Go to <Link href="/settings" className="underline">Settings</Link> to add your skills.</p>
            <Button asChild size="sm" variant="default" className="mt-2">
                <Link href="/settings">+ Add Skill</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
