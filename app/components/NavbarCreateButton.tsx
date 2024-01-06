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

  if (pathname === "/periods") {
    function toggleModal() {
      modalPeriodRef.current?.toggleModal();
    }
    return (
      <>
        <ModalCreatePeriod ref={modalPeriodRef} />
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Criar Período
        </button>
      </>
    );
  } else if (pathname === "/classes") {
    function toggleModal() {
      modalClassesRef.current?.toggleModal();
    }
    return (
      <>
        <ModalCreateClasses ref={modalClassesRef} />
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Criar Turma
        </button>
      </>
    );
  }

  return;
}
