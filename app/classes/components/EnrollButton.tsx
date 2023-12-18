"use client";

import { enrollmentsAtom } from "@/app/atoms/enrollmentsAtom";
import { useUserId } from "@/app/hooks/useUserId";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { useRecoilState } from "recoil";

interface IEnrollButtonProps {
  classId: string;
  setUpdateEnrollments?: any;
}

export default function EnrollButton({
  classId,
  setUpdateEnrollments,
}: IEnrollButtonProps) {
  const userId = useUserId();
  const [userEnrollments, setUserEnrollments] = useRecoilState(enrollmentsAtom);
  const isEnrolled = userEnrollments.includes(classId as never);

  async function enroll() {
    try {
      const response = await fetch(`/api/enrollment`, {
        method: "POST",
        body: JSON.stringify({ userId, classId }),
      });
      const data = await response.json();
      setUserEnrollments([...userEnrollments, data[0].classId]);
      setUpdateEnrollments(true);
    } catch (error) {
      console.error("Error enrolling class:", error);
    }
  }

  async function unenroll() {
    try {
      const response = await fetch(`/api/enrollment`, {
        method: "DELETE",
        body: JSON.stringify({ userId, classId }),
      });
      const data = await response.json();
      const filteredEnrollments = userEnrollments.filter(
        (item) => item.classId === classId
      );

      setUserEnrollments(filteredEnrollments);
      setUpdateEnrollments(true);
    } catch (error) {
      console.error("Error unenrolling class:", error);
    }
  }

  async function toggleEnroll() {
    if (isEnrolled) {
      await unenroll();
    } else {
      await enroll();
    }
  }

  return (
    <button onClick={toggleEnroll}>
      {isEnrolled ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
}
