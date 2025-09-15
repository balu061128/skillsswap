
"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProfileClient } from "./_components/profile-client";

export default function ProfilePage() {
  const { user } = useAuth();

  // The main AppLayout now handles the loading and authentication check,
  // so we can be sure that `user` is available here.
  
  return <ProfileClient userId={user!.uid} isCurrentUser={true} />;
}
