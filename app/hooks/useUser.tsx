import supabase from "../api/db";

export default async function useUser() {
  return await supabase.auth.getUser();
}
