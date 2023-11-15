"use client";

import { newClassAtom } from "@/app/atoms/newClassAtom";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import SideBarButton from "./SideBarButton";

export default function ClassesMenu() {
  const [classesOpen, setClassesOpen] = useState(false);
  const [newClasses, setNewClasses] = useRecoilState(newClassAtom);

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
        {newClasses &&
          newClasses.map((classItem, index) => (
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
