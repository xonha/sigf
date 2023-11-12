"use client";

import { useState } from "react";
import SideBarButton from "./SideBarButton";
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

const classes = [
  {
    id: "1",
    name: "Avançada 1",
  },
  {
    id: "2",
    name: "Avançada 2",
  },
  {
    id: "3",
    name: "Iniciante 1",
  },
  {
    id: "4",
    name: "Iniciante 2",
  },
];

export default function ClassesMenu() {
  const [classesOpen, setClassesOpen] = useState(false);

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
        {classes.map((c) => (
          <SideBarButton
            key={c.id}
            text={c.name}
            icon={<FaAngleRight />}
            href="/login"
          />
        ))}
      </>
    );
  }
}
