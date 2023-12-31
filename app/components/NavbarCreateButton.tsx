"use client";
import { useRef } from "react";
import ModalCreateClasses, {
  ModalCreateClassesRef,
} from "./ModalCreateClasses";
import ModalCreatePeriod, { ModalCreatePeriodRef } from "./ModalCreatePeriod";

import { usePathname } from "next/navigation";

export default function NavbarCreateButton() {
  const modalClassesRef = useRef<ModalCreateClassesRef>(null);
  const modalPeriodRef = useRef<ModalCreatePeriodRef>(null);
  const pathname = usePathname();

  function toggleModal() {
    if (pathname === "/classes") {
      modalClassesRef.current?.toggleModal();
    } else if (pathname === "/periods") {
      modalPeriodRef.current?.toggleModal();
    }
  }

  return (
    <>
      <ModalCreateClasses ref={modalClassesRef} />
      <ModalCreatePeriod ref={modalPeriodRef} />
      <button
        onClick={toggleModal}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {pathname === "/classes" ? "Criar Turma" : "Criar Período"}
      </button>
    </>
  );
}
