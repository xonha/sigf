import supabase from "@/utils/db";

export default async function useUser() {
  return await supabase.auth.getUser();
}
