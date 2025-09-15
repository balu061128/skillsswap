import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Video } from "lucide-react";

export default function SchedulePage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Schedule</h1>
        <p className="text-muted-foreground">View your upcoming sessions or schedule a new one.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardContent className="p-0">
                    <Calendar
                        mode="multiple"
                        selected={[new Date(), new Date(Date.now() + 86400000 * 2)]}
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
                    <div className="p-4 rounded-lg bg-muted flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                            <Clock className="w-5 h-5"/>
                        </div>
                        <div>
                            <p className="font-semibold">Advanced React Hooks</p>
                            <p className="text-sm text-muted-foreground">With Olivia Martin</p>
                            <p className="text-xs text-muted-foreground mt-1">Tomorrow at 2:00 PM</p>
                            <Button size="sm" variant="outline" className="mt-2"><Video className="w-4 h-4 mr-2"/> Join Session</Button>
                        </div>
                    </div>
                     <div className="p-4 rounded-lg bg-muted flex items-start gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-2">
                            <Clock className="w-5 h-5"/>
                        </div>
                        <div>
                            <p className="font-semibold">Intro to Figma</p>
                            <p className="text-sm text-muted-foreground">With Jackson Lee</p>
                            <p className="text-xs text-muted-foreground mt-1">October 25th at 4:00 PM</p>
                            <Button size="sm" variant="outline" className="mt-2"><Video className="w-4 h-4 mr-2"/> Join Session</Button>
                        </div>
                    </div>
                </CardContent>
             </Card>
        </div>
      </div>
    </div>
  );
}
