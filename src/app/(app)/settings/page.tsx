

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
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile, updateUserProfile, uploadProfilePicture } from "@/services/user";
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

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isFormLoading, setIsFormLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


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

      const userData: Partial<User> = {
          name: data.name,
          bio: data.bio,
          skillsToTeach,
          skillsToLearn
      };

      await updateUserProfile(user.uid, userData);

      toast({
        title: "Profile Updated",
        description: "Your profile text fields have been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleFileUpload = async () => {
    if (!selectedFile || !user) return;

    setIsUploading(true);
    try {
        await uploadProfilePicture(user.uid, selectedFile);
        toast({
            title: "Success!",
            description: "Your profile picture has been updated.",
        });
        // Force a page reload to show the new avatar in the header
        window.location.reload(); 
    } catch (error) {
        toast({
            title: "Upload Failed",
            description: "Could not upload your picture. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsUploading(false);
    }
  };

  if (authLoading || isFormLoading) {
    return <SettingsSkeleton />;
  }

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
              <Button type="submit" disabled={form.formState.isSubmitting || isFormLoading}>
                {form.formState.isSubmitting ? <Loader2 className="animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
        
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

    