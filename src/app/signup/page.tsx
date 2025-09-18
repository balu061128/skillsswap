
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
import { Logo } from "@/components/shared/Logo";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { createUser } from "@/services/user";
import { Loader2, Upload } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSignup = async () => {
    setLoading(true);
    try {
      // In a real app, you would upload the file to a storage service (like Firebase Storage)
      // and get a URL to pass to the createUser function.
      // For now, we are just demonstrating the UI.
      await createUser(email, password, name);
      toast({
        title: "Account Created!",
        description: "Welcome to Skill Collab.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Signup failed:", error);
      toast({
        title: "Signup Failed",
        description: error.message || "Could not create your account. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-sm animate-fade-in-up">
        <Card>
          <CardHeader className="space-y-4 text-center">
            <Logo className="justify-center" />
            <div className="space-y-1">
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Join our community to start swapping skills today.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Ada Lovelace"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
                <Label>Profile Picture (Optional)</Label>
                 <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
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
                  {fileName ? (
                    <span className="text-sm text-muted-foreground truncate">{fileName}</span>
                  ) : (
                    <span className="text-sm text-muted-foreground">No file selected</span>
                  )}
                </div>
                 <p className="text-xs text-muted-foreground">File upload is for demonstration only.</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create Account"}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
