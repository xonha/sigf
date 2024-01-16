"use client";

import {
  IClassesAtom,
  sortedClassesSelector,
} from "@/app/utils/atoms/classesAtom";
import { enrollmentsAtom } from "@/app/utils/atoms/enrollmentsAtom";
import useUser from "@/app/utils/hooks/useUser";
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
  const sortedClasses = useRecoilValue(sortedClassesSelector);
  const setUserEnrollments = useSetRecoilState(enrollmentsAtom);
  const [updateEnrollments, setUpdateEnrollments] = useState(false);

  const columnDefs: ColDef<IClassesAtom>[] = [
    {
      headerName: "Nome",
      flex: 1,
      sortIndex: 0,
      cellRenderer: handleClassName,
    },
    { headerName: "Inscrição", flex: 1, cellRenderer: handleEnroll },
    { headerName: "Ações", flex: 1, cellRenderer: handleActions },
  ];

  function handleClassName(params) {
    const classData = params.data;

    return (
      <Link className=" font-bold" href={`/classes/${classData.id}`}>
        {classData.name}
      </Link>
    );
  }

  function handleActions(params) {
    const classData = params.data;

    return <ButtonOptions id={classData.id} />;
  }

  function handleEnroll(params) {
    const classData = params.data;

    return (
      <ButtonEnroll
        classId={classData.id}
        setUpdateEnrollments={setUpdateEnrollments}
      />
    );
  }

  async function fetchEnrollments() {
    const { data, error } = await useUser();

    if (error) {
      console.error("Error getting user:", error);
      return;
    }

    try {
      const res = await fetch(`/api/enrollments/userId/${data.user.id}`);
      const resData = await res.json();

      const classesEnrolled = await resData.map(
        (enrollment: { classId: string }) => enrollment.classId
      );
      setUserEnrollments(classesEnrolled);
    } catch (error) {
      console.error("Error getting enrollments:", error);
    }
  }

  useEffect(() => {
    fetchEnrollments();
    setUpdateEnrollments(false);
  }, [updateEnrollments]);

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
