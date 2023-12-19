"use client";

import { enrollmentsAtom } from "@/app/atoms/enrollmentsAtom";
import useUser from "@/app/hooks/useUser";
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
  const [userEnrollments, setUserEnrollments] = useRecoilState(enrollmentsAtom);
  const isEnrolled = userEnrollments.includes(classId as never);

  async function enroll() {
    try {
      const { data, error } = await useUser();
      if (error) {
        console.error("Error getting user:", error);
        return;
      }
      const res = await fetch(`/api/enrollment`, {
        method: "POST",
        body: JSON.stringify({ userId: data.user.id, classId }),
      });
      const resData = await res.json();
      setUserEnrollments([...userEnrollments, resData[0].classId]);
      setUpdateEnrollments(true);
    } catch (error) {
      console.error("Error enrolling class:", error);
    }
  }

  async function unenroll() {
    try {
      const { data, error } = await useUser();

      if (error) {
        console.error("Error getting user:", error);
        return;
      }
      const response = await fetch(`/api/enrollment`, {
        method: "DELETE",
        body: JSON.stringify({ userId: data.user.id, classId }),
      });
      await response.json();
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
