"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { enrollmentCountAtom } from "@/atoms/enrollmentsAtom";
import {
  modalIsOpenAtom,
  modalOptionsAtom,
  modalIdAtom,
  TModalOptions,
} from "@/atoms/modalAtom";
import ButtonNewCalendar from "../(authPages)/calendar/components/ButtonNewCalendar";
import GenerateClassDates from "../(authPages)/classes/[id]/attendance/components/CreateClassDates";

export default function NavbarButtonIndex() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setModalId = useSetRecoilState(modalIdAtom);
  const enrollmentCount = useRecoilValue(enrollmentCountAtom);

  const pathname = usePathname();
  const classesIdRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  );
  const attendanceRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/attendance$/,
  );

  function openModal(modalOption: TModalOptions) {
    setModalOption(modalOption);
    setModalId("");
    setIsModalOpen(true);
  }

  if (pathname === "/periods") {
    return (
      <>
        <button
          onClick={() => openModal("periods")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Criar Período
        </button>
      </>
    );
  } else if (pathname === "/calendar") {
    return <ButtonNewCalendar />;
  } else if (pathname === "/classes") {
    return (
      <>
        <button
          onClick={() => openModal("classes")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Criar Turma
        </button>
      </>
    );
  } else if (pathname.match(classesIdRegex)) {
    return (
      <div className="flex gap-4">
        <div
          className={
            enrollmentCount.leader >= enrollmentCount.half
              ? "bg-blue-300  text-white font-bold py-2 px-4 rounded"
              : "bg-blue-500  text-white font-bold py-2 px-4 rounded"
          }
        >
          Condutorxs: {enrollmentCount.leader} / {enrollmentCount.half}
        </div>
        <Link
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          href={`${pathname}/attendance`}
        >
          Presenças
        </Link>
        <div
          className={
            enrollmentCount.led >= enrollmentCount.half
              ? "bg-orange-300  text-white font-bold py-2 px-4 rounded"
              : "bg-orange-500  text-white font-bold py-2 px-4 rounded"
          }
        >
          Conduzidxs: {enrollmentCount.led} / {enrollmentCount.half}
        </div>
      </div>
    );
  } else if (pathname.match(attendanceRegex)) {
    return <GenerateClassDates />;
  }

  return;
}
