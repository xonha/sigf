"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/sign-out", {
      method: "POST",
    });
    router.push("/login");
  }

  return (
    <button
      className="py-2 px-4 rounded-md no-underline bg-green-500 hover:bg-btn-background-hover text-white"
      onClick={logout}
    >
      Logout
    </button>
  );
}
