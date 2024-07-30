import axios from "axios";

export type TAuthUserUpdate = {
  full_name?: string;
  email?: string;
  password?: string;
  avatar_url?: string;
};

export function updateUser(user: TAuthUserUpdate) {
  try {
    const updatedUser = axios.patch("/api/auth/update-user", {
      email: user.email,
      password: user.password,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return;
  }
}
