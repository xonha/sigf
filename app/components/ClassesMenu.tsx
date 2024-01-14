"use client";

import { sortedClassesSelector } from "@/app/utils/atoms/classesAtom";
import Link from "next/link";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import SideBarButton from "./SideBarButton";

export default function ClassesMenu() {
  const [classesOpen, setClassesOpen] = useState(false);
  const sortedNewClasses = useRecoilValue(sortedClassesSelector);

  const toggleClassesOpen = () => {
    setClassesOpen(!classesOpen);
  };

  if (!classesOpen) {
    return (
      <>
        <div className="flex items-center p-4 cursor-pointer gap-4">
          <button onClick={toggleClassesOpen}>
            <FaAngleRight />
          </button>
          <Link href="/classes">Turmas</Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex items-center p-4 cursor-pointer gap-4">
          <button onClick={toggleClassesOpen}>
            <FaAngleDown />
          </button>
          <Link href="/classes">Turmas</Link>
        </div>
        {sortedNewClasses.map((classItem) => (
          <SideBarButton
            key={classItem.id}
            text={classItem.name}
            icon={<FaAngleRight />}
            href={`/classes/${classItem.id}`}
          />
        ))}
      </>
    );
  }
}
