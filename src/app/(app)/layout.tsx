

"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Bell,
  Home,
  LineChart,
  Package2,
  PanelLeft,
  Search,
  Users,
  Briefcase,
  Lightbulb,
  Calendar,
  Settings,
  LogOut,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { useAuth, AuthProvider } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/profile", icon: Users, label: "My Profile" },
  { href: "/matching", icon: Briefcase, label: "Skill Matching" },
  { href: "/skills", icon: LineChart, label: "Skill Listings" },
  { href: "/recommendations", icon: Lightbulb, label: "Recommendations" },
  { href: "/schedule", icon: Calendar, label: "Schedule" },
  { href: "/messages", icon: MessageSquare, label: "Messages" },
];


function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, currentUser, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user || !currentUser) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };
  
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery) {
      // In a real app, you would navigate to a search results page
      console.log('Searching for:', searchQuery);
      // router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col h-full">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navLinks.map(link => {
                const isActive = pathname.startsWith(link.href);
                return (
                   <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                      isActive ? "bg-muted text-primary" : "text-muted-foreground"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>
          <div className="mt-auto p-4">
              <Link
                href="/settings"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === "/settings" ? "bg-muted text-primary" : "text-muted-foreground"
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
          </div>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Skill Collab</span>
                </Link>
                 {navLinks.map(link => {
                   const isActive = pathname.startsWith(link.href);
                   return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "flex items-center gap-4 px-2.5",
                           isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                   )
                 })}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px] transition-all duration-300 focus:w-[240px] lg:focus:w-[360px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <Avatar>
                  <AvatarImage src={currentUser.avatarUrl || "https://picsum.photos/seed/user-avatar/40/40" } alt="User" data-ai-hint="person" />
                  <AvatarFallback>{currentUser.name?.charAt(0) ?? 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/settings">Settings</Link></DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AuthProvider>
  );
}
