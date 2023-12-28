import supabase from "../db";

export default async function useUser() {
  return await supabase.auth.getUser();
}
