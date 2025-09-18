
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Video, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Session = {
  title: string;
  with: string;
  date: Date;
}

// Start with an empty array of sessions
const initialSessions: Session[] = []


export default function SchedulePage() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [newSessionWith, setNewSessionWith] = useState("");
  const [newSessionDate, setNewSessionDate] = useState<Date | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const selectedDates = sessions.map(s => s.date);

  const handleScheduleSession = () => {
    if (newSessionTitle && newSessionWith && newSessionDate) {
      setSessions([...sessions, { title: newSessionTitle, with: newSessionWith, date: newSessionDate }]);
      toast({ title: "Session Scheduled!", description: `${newSessionTitle} has been added to your calendar.`});
      setNewSessionTitle("");
      setNewSessionWith("");
      setNewSessionDate(undefined);
      setIsDialogOpen(false);
    } else {
      toast({ title: "Error", description: "Please fill out all fields.", variant: "destructive"});
    }
  }

  return (
    <div className="w-full space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Schedule</h1>
          <p className="text-muted-foreground">View your upcoming sessions or schedule a new one.</p>
        </div>
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4"/>Schedule New Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule a New Session</DialogTitle>
              <DialogDescription>
                Fill in the details below to add a new session to your calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input id="title" value={newSessionTitle} onChange={e => setNewSessionTitle(e.target.value)} className="col-span-3" placeholder="e.g., Intro to Python"/>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="with" className="text-right">With</Label>
                <Input id="with" value={newSessionWith} onChange={e => setNewSessionWith(e.target.value)} className="col-span-3" placeholder="e.g., Ada Lovelace"/>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Calendar mode="single" selected={newSessionDate} onSelect={setNewSessionDate} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleScheduleSession}>Schedule Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        className="p-4 w-full"
                    />
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1 space-y-4">
             <Card>
                <CardHeader>
                    <CardTitle>Upcoming</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {sessions.sort((a,b) => a.date.getTime() - b.date.getTime()).map((session, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                            <Clock className="w-5 h-5"/>
                        </div>
                        <div>
                            <p className="font-semibold">{session.title}</p>
                            <p className="text-sm text-muted-foreground">With {session.with}</p>
                            <p className="text-xs text-muted-foreground mt-1">{session.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {session.date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
                            <Button size="sm" variant="outline" className="mt-2"><Video className="w-4 h-4 mr-2"/> Join Session</Button>
                        </div>
                    </div>
                  ))}
                  {sessions.length === 0 && <p className="text-sm text-muted-foreground">No upcoming sessions.</p>}
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
