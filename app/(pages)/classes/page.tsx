"use client";

import { TClasses } from "@/app/api/classes/[id]/route";
import { readEnrollments } from "@/app/controllers/Enrollments";
import {
  classesAtom,
  sortedClassesSelector,
} from "@/app/utils/atoms/classesAtom";
import { enrollmentsAtom } from "@/app/utils/atoms/enrollmentsAtom";
import { usersAtom } from "@/app/utils/atoms/usersAtom";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ButtonEnroll from "./components/ButtonEnroll";
import ButtonOptions from "./components/ButtonOptions";
import { readClasses } from "@/app/api/classes/controller";

export default function ClassesPage() {
  const user = useRecoilValue(usersAtom);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const setUserEnrollments = useSetRecoilState(enrollmentsAtom);
  const setClasses = useSetRecoilState(classesAtom);
  const sortedClasses = useRecoilValue(sortedClassesSelector);
  const columnDefs: ColDef<TClasses>[] = [
    {
      headerName: "Nome",
      flex: 1,
      sortIndex: 0,
      cellRenderer: cellRendererClassName,
    },
    {
      headerName: "Dias de Aula",
      field: "weekDays",
      flex: 1,
    },
    {
      headerName: "Inscrição",
      flex: 1,
      cellRenderer: cellRendererEnroll,
    },
    {
      headerName: "Ações",
      flex: 1,
      cellRenderer: cellRendererActions,
    },
  ];

  user?.userRole !== "admin";

  const columnDefsNonAdmin: ColDef<TClasses>[] = [
    {
      headerName: "Nome",
      flex: 1,
      sortIndex: 0,
      cellRenderer: cellRendererClassName,
    },
    {
      headerName: "Dias de Aula",
      field: "weekDays",
      flex: 1,
    },
    {
      headerName: "Inscrição",
      flex: 1,
      cellRenderer: cellRendererEnroll,
    },
  ];

  function cellRendererClassName(params: { data: any }) {
    const classData = params.data;

    return (
      <Link className=" font-bold" href={`/classes/${classData.id}`}>
        {classData.name}
      </Link>
    );
  }

  function cellRendererActions(params: { data: { id: string } }) {
    return <ButtonOptions id={params.data.id} />;
  }

  function cellRendererEnroll(params: { data: { id: string } }) {
    return (
      <ButtonEnroll
        classId={params.data.id}
        setUpdateEnrollments={setShouldUpdate}
      />
    );
  }

  useEffect(() => {
    async function handleUpdateGlobalStates() {
      const classes = await readClasses();
      const enrollments = await readEnrollments();

      setClasses(classes);
      setUserEnrollments(enrollments);
      setShouldUpdate(false);
    }

    handleUpdateGlobalStates();
  }, [shouldUpdate]);

  return (
    <AgGridReact
      className="w-full p-4"
      rowData={sortedClasses}
      columnDefs={user?.userRole === "admin" ? columnDefs : columnDefsNonAdmin}
      overlayNoRowsTemplate="ㅤ"
    />
  );
}
