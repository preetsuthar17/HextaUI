"use client";

import { User } from "@supabase/supabase-js";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Mail,
  User as UserIcon,
  LogOut,
  Github,
  Shield,
  MoreVertical,
  Crown,
  Chrome,
} from "lucide-react";
import { createClient } from "@/app/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu/dropdown-menu";
import {
  getUserProfileClient,
  type UserProfile,
} from "@/lib/supabase/profiles";
import { Badge } from "../ui/Badge";

interface DashboardContentProps {
  user: User;
}

export function DashboardContent({ user }: DashboardContentProps) {
  const router = useRouter();
  const supabase = createClient();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfileClient(supabase, user.id);
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user.id, supabase]);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Use consistent date formatting to avoid hydration mismatch
  const joinedDate = useMemo(() => {
    const date = new Date(user.created_at);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Force UTC to ensure consistency
    });
  }, [user.created_at]);
  // Ensure consistent initials calculation with proper Unicode handling
  const initials = useMemo(() => {
    if (user.user_metadata?.full_name) {
      try {
        const name = user.user_metadata.full_name.trim();
        // Handle Unicode characters properly
        const words = name
          .split(/\s+/)
          .filter((word: string | any[]) => word.length > 0);
        if (words.length === 0) {
          return user.email ? user.email.charAt(0).toUpperCase() : "U";
        }

        // Get first character of first two words, handling Unicode properly
        let result = "";
        for (let i = 0; i < Math.min(2, words.length); i++) {
          const word = words[i];
          if (word.length > 0) {
            // Use Array.from to handle Unicode characters properly
            const chars = Array.from(word);
            const firstChar = chars[0];
            // Only use ASCII letters and numbers for initials
            if (
              typeof firstChar === "string" &&
              /^[a-zA-Z0-9]$/.test(firstChar)
            ) {
              result += firstChar.toUpperCase();
            }
          }
        }

        return result.length > 0
          ? result
          : user.email
            ? user.email.charAt(0).toUpperCase()
            : "U";
      } catch (error) {
        console.warn("Error calculating initials:", error);
        return user.email ? user.email.charAt(0).toUpperCase() : "U";
      }
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  }, [user.user_metadata?.full_name, user.email]);

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "github":
        return <Github className="h-4 w-4" />;
      case "google":
        return <Chrome className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getProviderName = (provider: string) => {
    switch (provider) {
      case "github":
        return "GitHub";
      case "google":
        return "Google";
      default:
        return "Unknown";
    }
  };

  return (
    <main className="flex flex-col px-4 gap-24 py-24 max-w-5xl w-full mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.user_metadata?.full_name || user.email}!
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-8 relative">
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  icon={LogOut}
                  onClick={handleSignOut}
                  className="font-medium"
                >
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col items-center space-y-4 text-center">
            {" "}
            <Avatar size="2xl">
              <AvatarImage
                src={user.user_metadata?.avatar_url}
                alt={user.user_metadata?.full_name || user.email}
              />
              <AvatarFallback className="text-2xl">
                {mounted ? initials : "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold">
                  {user.user_metadata?.full_name || "User"}
                </h2>
                {userProfile?.premium && (
                  <Crown className="h-5 w-5 text-yellow-500" />
                )}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm flex-wrap  text-[hsl(var(--hu-muted-foreground))]">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span className="">{user.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span className="">Joined {joinedDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
              {/* Premium Status */}
              {loading ? (
                <Badge>
                  <div className="h-4 w-4 animate-pulse  text-[hsl(var(--hu-muted-foreground))] rounded-full" />
                  <span>Loading...</span>
                </Badge>
              ) : userProfile?.premium ? (
                <Badge>
                  <Crown className="h-4 w-4" />
                  <span>Premium</span>
                </Badge>
              ) : (
                <Badge>
                  <UserIcon className="h-4 w-4" />
                  <span>Free</span>
                </Badge>
              )}

              {/* Verified Badge */}
              <Badge variant="ghost">
                <Shield className="h-4 w-4" />
                <span>Verified</span>
              </Badge>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
