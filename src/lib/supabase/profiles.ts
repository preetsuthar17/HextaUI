import type { SupabaseClient } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  premium: boolean;
  created_at: string;
  updated_at: string;
}

// Client-side functions (for use in Client Components)
export async function getUserProfileClient(
  supabase: SupabaseClient,
  userId: string,
): Promise<UserProfile | null> {
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

export async function updateUserPremiumStatusClient(
  supabase: SupabaseClient,
  userId: string,
  premium: boolean,
): Promise<boolean> {
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
