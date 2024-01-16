"use client";
import { useRef } from "react";
import ModalCreateClasses, {
  ModalCreateClassesRef,
} from "./ModalCreateClasses";
import ModalCreatePeriod, { ModalCreatePeriodRef } from "./ModalCreatePeriod";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GenerateClassDates from "../(pages)/classes/[id]/attendance/components/CreateClassDates";

export default function NavbarCreateButton() {
  const modalClassesRef = useRef<ModalCreateClassesRef>(null);
  const modalPeriodRef = useRef<ModalCreatePeriodRef>(null);
  const pathname = usePathname();
  const classesIdRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  );
  const attendanceRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/attendance$/
  );

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
  } else if (pathname.match(classesIdRegex)) {
    return (
      <div>
        <Link
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          href={`${pathname}/attendance`}
        >
          Presenças
        </Link>
      </div>
    );
  } else if (pathname.match(attendanceRegex)) {
    return <GenerateClassDates />;
  }

  return;
}
