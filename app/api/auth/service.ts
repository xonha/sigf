import { Database } from "@/database.types";
import axios from "axios";

export type TAuthUserUpdate =
  Database["public"]["Views"]["users_view"]["Update"];

export function updateUser(user: TAuthUserUpdate) {
  try {
    const updatedUser = axios.patch("/api/auth/update-user", {
      email: user.email,
      password: user.password,
      data: {
        full_name: user.full_name,
        avatar_url: user.avatar_url,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return;
  }
}
