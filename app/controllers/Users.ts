import { TUser, TUserViewPlusRole } from "../api/users/route";

export async function readUsers() {
  try {
    const res = await fetch(`/api/users`);
    const users: TUserViewPlusRole[] = await res.json();
    return users;
  } catch (error) {
    console.error("Error reading periods:", error);
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
    console.error("Error reading periods:", error);
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
    console.error("Error reading periods:", error);
    throw error;
  }
}
