"use client";

import { enrollmentCountAtom } from "@/atoms/enrollmentsAtom";
import { usersAtom } from "@/atoms/usersAtom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRecoilValue } from "recoil";
import ButtonNewCalendar from "../(authPages)/calendar/components/ButtonNewCalendar";
import GenerateClassDates from "../(authPages)/classes/[id]/attendance/components/CreateClassDates";
import { useModal } from "./MainModal";

export default function NavbarButtonIndex() {
  const openModal = useModal();
  const enrollmentCount = useRecoilValue(enrollmentCountAtom);
  const user = useRecoilValue(usersAtom);
  const userRole = user?.userRole;

  const pathname = usePathname();
  const classesIdRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  );
  const attendanceRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/attendance$/,
  );

  if (pathname === "/periods" && userRole === "admin") {
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
  } else if (pathname === "/calendar" && userRole === "admin") {
    return <ButtonNewCalendar />;
  } else if (pathname === "/classes" && userRole === "admin") {
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
  } else if (pathname.match(classesIdRegex) && userRole === "admin") {
    return (
      <div className="flex gap-4">
        <div
          className={
            enrollmentCount.leader >= enrollmentCount.half
              ? "bg-blue-300  text-white font-bold py-2 px-4 rounded"
              : "bg-blue-500  text-white font-bold py-2 px-4 rounded"
          }
        >
          Condutores(as): {enrollmentCount.leader} / {enrollmentCount.half}
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
          Conduzidos(as): {enrollmentCount.led} / {enrollmentCount.half}
        </div>
      </div>
    );
  } else if (pathname.match(classesIdRegex)) {
    return (
      <Link
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        href={`${pathname}/userAttendance`}
      >
        Minhas presenças
      </Link>
    );
  } else if (pathname.match(attendanceRegex) && userRole === "admin") {
    return <GenerateClassDates />;
  }

  return;
}
