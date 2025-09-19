

"use client";

import { useEffect, useState, useRef } from "react";
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
import { Label } from "@/components/ui/label";
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
import { Loader2, Upload, KeyRound, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { User } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  bio: z.string().max(280, { message: "Bio cannot be longer than 280 characters." }).optional(),
  skillsToTeach: z.string().optional(),
  skillsToLearn: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const mockUser: User = {
    id: "mock-user-123",
    name: "Alex Doe",
    avatarUrl: "https://picsum.photos/seed/alex-doe/128/128",
    bio: "Enthusiastic learner and passionate teacher of web technologies. Let's connect and grow together!",
    skillsToTeach: ["React", "TypeScript", "Node.js"],
    skillsToLearn: ["Python", "Data Science", "Figma"],
    rating: 4.8,
    reviews: 23,
};


export default function SettingsPage() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: mockUser.name,
      bio: mockUser.bio,
      skillsToTeach: mockUser.skillsToTeach.join(", "),
      skillsToLearn: mockUser.skillsToLearn.join(", "),
    },
  });
  

  async function onSubmit(data: ProfileFormValues) {
    // In a real app, this would call updateUserProfile
    console.log("Saving data:", data);
    toast({
      title: "Profile Updated (Mock)",
      description: "Your profile information has been saved.",
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleFileUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    // In a real app, this would call uploadProfilePicture
    console.log("Uploading file:", selectedFile.name);
    setTimeout(() => {
        toast({
            title: "Success! (Mock)",
            description: "Your profile picture has been updated.",
        });
        setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="w-full grid gap-8">
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
        
          <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your avatar. This is a separate action from saving your profile.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Choose File
                  </Button>
                  <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif"
                  />
                  {selectedFile ? (
                    <span className="text-sm text-muted-foreground">{selectedFile.name}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">No file selected</span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="button" onClick={handleFileUpload} disabled={!selectedFile || isUploading}>
                    {isUploading ? <Loader2 className="animate-spin mr-2" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                    Upload Picture
                </Button>
              </CardFooter>
            </Card>
              
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="your_username" disabled />
                  <FormDescription>Usernames cannot be changed yet.</FormDescription>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Button variant="outline" disabled>
                      <KeyRound className="mr-2 h-4 w-4" /> Change Password
                  </Button>
                  <FormDescription>Password management is not yet available.</FormDescription>
                </div>
              </CardContent>
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
