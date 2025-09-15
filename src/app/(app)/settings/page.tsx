
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile, updateUserProfile } from "@/services/user";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/lib/types";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(280, { message: "Bio cannot be longer than 280 characters." }).optional(),
  skillsToTeach: z.string().optional(),
  skillsToLearn: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isFormLoading, setIsFormLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      bio: "",
      skillsToTeach: "",
      skillsToLearn: "",
    },
  });
  
  useEffect(() => {
    if (user) {
      setIsFormLoading(true);
      getUserProfile(user.uid).then((profile) => {
        if (profile) {
          form.reset({
            name: profile.name || "",
            bio: profile.bio || "",
            skillsToTeach: (profile.skillsToTeach || []).join(", "),
            skillsToLearn: (profile.skillsToLearn || []).join(", "),
          });
        }
        setIsFormLoading(false);
      });
    } else if (!authLoading) {
      setIsFormLoading(false);
    }
  }, [user, authLoading, form]);


  async function onSubmit(data: ProfileFormValues) {
    if (!user) {
      toast({ title: "Error", description: "You must be logged in to update your profile.", variant: "destructive" });
      return;
    }

    try {
      const skillsToTeach = data.skillsToTeach?.split(',').map(s => s.trim()).filter(Boolean) || [];
      const skillsToLearn = data.skillsToLearn?.split(',').map(s => s.trim()).filter(Boolean) || [];

      // Optimistically create a user data object to pass to updateUserProfile
      const userData: Partial<User> = {
          name: data.name,
          bio: data.bio,
          skillsToTeach,
          skillsToLearn
      };

      await updateUserProfile(user.uid, userData);

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    }
  }

  if (authLoading || isFormLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>
                This information will be displayed on your public profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us a little about yourself" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="skillsToTeach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills to Teach</FormLabel>
                    <FormControl>
                      <Input placeholder="React, Python, Figma" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter skills you can teach, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="skillsToLearn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills to Learn</FormLabel>
                    <FormControl>
                      <Input placeholder="Data Science, 3D Modeling" {...field} />
                    </FormControl>
                     <FormDescription>
                      Enter skills you want to learn, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}

function SettingsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
         <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  )
}
