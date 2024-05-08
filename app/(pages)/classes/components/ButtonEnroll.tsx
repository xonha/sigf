"use client";

import {
  createEnrollment,
  deleteEnrollment,
} from "@/app/api/enrollments/controller";
import { enrollmentsAtom } from "@/app/utils/atoms/enrollmentsAtom";
import { useRecoilState } from "recoil";

interface IButtonEnrollProps {
  classId: string;
  setUpdateEnrollments?: any;
}

export default function ButtonEnroll({
  classId,
  setUpdateEnrollments,
}: IButtonEnrollProps) {
  const [userEnrollments, setUserEnrollments] = useRecoilState(enrollmentsAtom);
  const isEnrolled = userEnrollments.includes(classId as never);

  async function toggleEnroll() {
    if (isEnrolled) {
      await deleteEnrollment(
        classId,
        setUserEnrollments,
        setUpdateEnrollments,
        userEnrollments,
      );
    } else {
      await createEnrollment(
        classId,
        setUserEnrollments,
        setUpdateEnrollments,
        userEnrollments,
      );
    }
  }

  if (!isEnrolled) {
    return (
      <button
        className="text-green-500 hover:text-green-400 font-bold"
        onClick={toggleEnroll}
      >
        Inscrever
      </button>
    );
  }

  return (
    <button
      className="text-red-500 hover:text-red-400 font-bold"
      onClick={toggleEnroll}
    >
      Cancelar Inscrição
    </button>
  );
}
