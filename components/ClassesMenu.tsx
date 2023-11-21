"use client";

import { sortedNewClassSelector } from "@/app/atoms/newClassAtom";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import SideBarButton from "./SideBarButton";

export default function ClassesMenu() {
  const [classesOpen, setClassesOpen] = useState(false);
  const sortedNewClasses = useRecoilValue(sortedNewClassSelector);

  const toggleClassesOpen = () => {
    setClassesOpen(!classesOpen);
  };

  if (!classesOpen) {
    return (
      <>
        <SideBarButton
          text="Turmas"
          icon={<FaAngleRight />}
          onClick={toggleClassesOpen}
        />
      </>
    );
  } else {
    return (
      <>
        <SideBarButton
          text="Turmas"
          icon={<FaAngleDown />}
          onClick={toggleClassesOpen}
        />
        {sortedNewClasses.map((classItem) => (
          <SideBarButton
            key={classItem.id}
            text={classItem.name}
            icon={<FaAngleRight />}
            href="/login"
          />
        ))}
      </>
    );
  }
}
