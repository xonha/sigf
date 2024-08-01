"use client";

import { attendancesAtom } from "@/atoms/attendanceAtom";
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
  const pathName = usePathname();

  const classesIdRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
  );
  const attendanceRegex = new RegExp(
    /\/classes\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\/attendance$/,
  );

  if (pathName === "/periods" && userRole === "admin") {
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
  } else if (pathName === "/calendar" && userRole === "admin") {
    return <ButtonNewCalendar />;
  } else if (pathName === "/classes" && userRole === "admin") {
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
  } else if (pathName.match(classesIdRegex) && userRole === "admin") {
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
          href={`${pathName}/attendance`}
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
  } else if (pathName.match(classesIdRegex)) {
    return (
      <Link
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        href={`${pathName}/userAttendance`}
      >
        Minhas presenças
      </Link>
    );
  } else if (pathName.match(attendanceRegex) && userRole === "admin") {
    return <GenerateClassDates />;
  } else if (pathName.includes("/userAttendance")) {
    const attendances = useRecoilValue(attendancesAtom);
    const totalRegistered = attendances.filter(
      (a) => a.presence !== "notRegistered",
    ).length;
    const totalPresent = attendances.filter(
      (a) => a.presence === "present",
    ).length;
    const totalJustified = attendances.filter(
      (a) => a.presence === "justified",
    ).length;
    const totalValidPresence = totalPresent + totalJustified;
    const attendancePercentage =
      totalValidPresence > 0 ? totalValidPresence / totalRegistered : 100;

    return (
      <div className="flex gap-4">
        <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
          {totalPresent} / {totalRegistered}
        </div>
        <div
          className={
            attendancePercentage > 75
              ? "bg-green-500 text-white font-bold py-2 px-4 rounded"
              : "bg-orange-500 text-white font-bold py-2 px-4 rounded"
          }
        >
          {attendancePercentage} %
        </div>
      </div>
    );
  }

  return;
}
