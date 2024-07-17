import { User } from "@supabase/supabase-js";
import supabase from "@/utils/db";
import { TUser, TUserViewPlusRole } from "./route";

export type TUserWithRole = User & { userRole: string };

export async function readUserWithRole() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error reading user session:", error);
    throw error;
  }

  const userData: User = data.user;
  try {
    const res = await fetch(`/api/users/${data.user?.id}`);
    const userRole: TUser = await res.json();

    const userWithRole = { ...userData, userRole: userRole.role };

    return userWithRole as TUserWithRole;
  } catch (error) {
    const userWithRole: TUserWithRole = { ...userData, userRole: "student" };
    return userWithRole;
  }
}

export async function readUsers() {
  try {
    const res = await fetch(`/api/users`);
    const users: TUserViewPlusRole[] = await res.json();
    return users;
  } catch (error) {
    console.error("Error reading users:", error);
    throw error;
  }
}

export async function createUser(user: TUser) {
  try {
    const res = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(user),
    });
    const newUser: TUser = await res.json();
    return newUser;
  } catch (error) {
    console.error("Error reading users:", error);
    throw error;
  }
}

export async function updateUser(user: TUser) {
  try {
    const res = await fetch(`/api/users`, {
      method: "PATCH",
      body: JSON.stringify(user),
    });
    const newUser: TUser = await res.json();
    return newUser;
  } catch (error) {
    console.error("Error reading users:", error);
    throw error;
  }
}
