"use client";

import supabase from "@/app/api/db";
import { sortedClassesSelector } from "@/app/atoms/classesAtom";
import { enrollmentsAtom } from "@/app/atoms/enrollmentsAtom";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ClassesOptionsButton from "./ClassesOptionsButton";
import EnrollButton from "./EnrollButton";

export default function Content() {
  const sortedClasses = useRecoilValue(sortedClassesSelector);
  const setUserEnrollments = useSetRecoilState(enrollmentsAtom);
  const [updateEnrollments, setUpdateEnrollments] = useState(false);

  async function fetchEnrollments() {
    const { data, error } = await supabase.auth.refreshSession();
    const { session, user } = data;

    try {
      // TODO: get user id from session
      const response = await fetch(
        `/api/enrollment/422de8aa-3562-455c-8b21-cc68e2ffb184`
      );
      const data = await response.json();

      const classesEnrolled = await data.map(
        (enrollment: { classId: string }) => enrollment.classId
      );
      setUserEnrollments(classesEnrolled);
    } catch (error) {
      console.error("Error getting enrollments:", error);
    }
  }

  useEffect(() => {
    fetchEnrollments();
    setUpdateEnrollments(false);
  }, [updateEnrollments]);

  return (
    <div className="w-full">
      <ol className="flex flex-wrap gap-6 p-6">
        {sortedClasses &&
          sortedClasses.map((classItem) => (
            <li
              key={classItem.id}
              className="w-[300px] h-[160px] border border-gray-300 rounded-[10px]"
            >
              <div className="h-[100px] flex flex-row p-4 items-center justify-center">
                {classItem.name}
              </div>

              <div className="flex flex-row-reverse gap-6 pt-5 px-4 relative border-t items-center">
                <ClassesOptionsButton id={classItem.id} />
                <EnrollButton
                  classId={classItem.id}
                  setUpdateEnrollments={setUpdateEnrollments}
                />
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}
