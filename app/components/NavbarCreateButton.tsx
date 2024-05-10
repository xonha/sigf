"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import GenerateClassDates from "../(pages)/classes/[id]/attendance/components/CreateClassDates";
import {
  TModalOptions,
  modalIdAtom,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "../utils/atoms/modalAtom";

export default function NavbarCreateButton() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setModalId = useSetRecoilState(modalIdAtom);

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
        <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Condutorxs: 23 / 30
        </div>
        <Link
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          href={`${pathname}/attendance`}
        >
          Presenças
        </Link>
        <div className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Conduzidxs: 27 / 30
        </div>
      </div>
    );
  } else if (pathname.match(attendanceRegex)) {
    return <GenerateClassDates />;
  }

  return;
}
