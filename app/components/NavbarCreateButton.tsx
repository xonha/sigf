"use client";
import { useRef } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GenerateClassDates from "../(pages)/classes/[id]/attendance/components/CreateClassDates";
import MainModal, { MainModalRef } from "./MainModal";

export default function NavbarCreateButton() {
  const modalRef = useRef<MainModalRef>(null);
  const pathname = usePathname();
  const classesIdRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
  );
  const attendanceRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/attendance$/
  );

  if (pathname === "/periods") {
    function toggleModal() {
      // modalPeriodRef.current?.toggleModal();
    }
    return (
      <>
        {/* <ModalCreatePeriod ref={modalPeriodRef} /> */}
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
      modalRef.current?.openModal();
    }
    return (
      <>
        <MainModal ref={modalRef} />
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
