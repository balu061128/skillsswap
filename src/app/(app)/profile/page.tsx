
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "./_components/profile-client";
import { Skeleton } from "@/components/ui/skeleton";


function ProfileSkeleton() {
    return (
        <div className="container mx-auto p-4 md:p-6">
        <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 flex flex-col items-center space-y-4">
            <Card className="w-full">
                <CardContent className="flex flex-col items-center pt-6 space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="text-center space-y-2">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-16 w-full" />
                <div className="w-full flex gap-2 pt-2">
                    <Skeleton className="h-10 flex-1" />
                </div>
                </CardContent>
            </Card>
            </div>
            
            <div className="md:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-20" />
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-28" />
                    <Skeleton className="h-8 w-32" />
                </CardContent>
            </Card>
            </div>
        </div>
        </div>
    );
}

// Dummy card components for the skeleton
function Card({children, className}: {children: React.ReactNode, className?: string}) {
    return <div className={`border bg-card rounded-lg shadow-sm ${className}`}>{children}</div>
}
function CardHeader({children}: {children: React.ReactNode}) {
    return <div className="flex flex-col space-y-1.5 p-6">{children}</div>
}
function CardContent({children, className}: {children: React.ReactNode, className?: string}) {
    return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}


export default function ProfilePage() {
  const { user, loading } = useAuth();

  // The main AppLayout handles the redirect if not authenticated.
  // We just need to handle the loading state here.
  if (loading || !user) {
    // You can return a full-page skeleton here if you prefer
    return <ProfileSkeleton />;
  }
  
  return <ProfileClient userId={user.uid} isCurrentUser={true} />;
}
