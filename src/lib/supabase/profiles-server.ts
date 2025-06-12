import { createClient } from "@/app/utils/supabase";
import type { UserProfile } from "./profiles";

// Server-side functions (for use in Server Components and API routes)
export async function getUserProfile(
  userId: string,
): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}

export async function createUserProfile(
  userId: string,
  email: string,
): Promise<UserProfile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .insert({
      id: userId,
      email: email,
      premium: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating user profile:", error);
    return null;
  }

  return data;
}

export async function updateUserPremiumStatus(
  userId: string,
  premium: boolean,
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_profiles")
    .update({ premium })
    .eq("id", userId);

  if (error) {
    console.error("Error updating premium status:", error);
    return false;
  }

  return true;
}

export async function ensureUserProfile(
  userId: string,
  email: string,
): Promise<UserProfile | null> {
  // Try to get existing profile
  let profile = await getUserProfile(userId);

  // If profile doesn't exist, create it
  if (!profile) {
    profile = await createUserProfile(userId, email);
  }

  return profile;
}
