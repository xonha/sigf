"use client";

import jwt from "jsonwebtoken";
import { useCookies } from "next-client-cookies";
import { FaRegBookmark } from "react-icons/fa6";

export default function EnrollButton(props: { id: string }) {
  const cookies = useCookies();

  function getUserId() {
    const accessToken = cookies.get("access_token");
    const decoded = accessToken ? jwt.decode(accessToken) : null;
    return decoded?.sub;
  }

  async function enroll() {
    try {
      const body = {
        userId: getUserId(),
        classId: props.id,
      };
      const response = await fetch(`/api/enrollment`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      const data = await response.json();
    } catch (error) {
      console.error("Error enrolling class:", error);
    }
  }

  return (
    <button onClick={enroll}>
      <FaRegBookmark />
    </button>
  );
}
