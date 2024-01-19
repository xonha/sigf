"use client";

import { TClasses } from "@/app/api/classes/[id]/route";
import { readClasses } from "@/app/controllers/Classes";
import { readEnrollments } from "@/app/controllers/Enrollments";
import {
  classesAtom,
  sortedClassesSelector,
} from "@/app/utils/atoms/classesAtom";
import { enrollmentsAtom } from "@/app/utils/atoms/enrollmentsAtom";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ButtonEnroll from "./components/ButtonEnroll";
import ButtonOptions from "./components/ButtonOptions";

export default function ClassesPage() {
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
      field: "week_days",
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

  function cellRendererClassName(params) {
    const classData = params.data;

    return (
      <Link className=" font-bold" href={`/classes/${classData.id}`}>
        {classData.name}
      </Link>
    );
  }

  function cellRendererActions(params) {
    return <ButtonOptions id={params.data.id} />;
  }

  function cellRendererEnroll(params) {
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
    <div
      className="ag-theme-quartz m-4"
      style={{ width: "100%", fontFamily: "monospace" }}
    >
      <AgGridReact
        rowData={sortedClasses}
        columnDefs={columnDefs}
        overlayNoRowsTemplate="ㅤ"
      />
    </div>
  );
}
