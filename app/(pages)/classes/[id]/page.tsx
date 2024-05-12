"use client";

import { readEnrollmentsByClassId } from "@/app/api/enrollments/controller";
import { classesAtom } from "@/app/atoms/classesAtom";
import {
  enrollmentCountAtom,
  IEnrollmentCounts,
} from "@/app/atoms/enrollmentsAtom";
import { usersAtom } from "@/app/atoms/usersAtom";
import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IRow {
  classId: string;
  userId: string;
  status: Database["public"]["Enums"]["enrollmentStatus"];
  attendance: string;
  danceRole: Database["public"]["Enums"]["danceRole"];
  createdAt: Date;
  users_view: {
    name: string;
    email: string;
  };
  actionButton?: React.ReactNode;
}

export default function ClassesIdPage() {
  const user = useRecoilValue(usersAtom);
  const setEnrollmentsCount = useSetRecoilState(enrollmentCountAtom);
  const classes = useRecoilValue(classesAtom);
  const classId = useParams().id;
  const [rowData, setRowData] = useState<IRow[]>([]);
  const columnDefs: ColDef<IRow>[] = [
    { field: "users_view.name", headerName: "Nome", flex: 3 },
    { field: "users_view.email", headerName: "Email", flex: 3 },
    { field: "createdAt", headerName: "Data da inscrição", flex: 3 },
    { field: "danceRole", headerName: "Papel", flex: 2 },
    { field: "status", headerName: "Inscrição", flex: 2 },
    {
      field: "actionButton",
      headerName: "Ações",
      flex: 3,
      cellRenderer: actionButtonRenderer,
    },
  ];
  const columnDefsNonAdmin: ColDef<IRow>[] = [
    { field: "users_view.name", headerName: "Nome", flex: 3 },
    { field: "users_view.email", headerName: "Email", flex: 3 },
    { field: "createdAt", headerName: "Data da inscrição", flex: 3 },
    { field: "danceRole", headerName: "Papel", flex: 2 },
    { field: "status", headerName: "Inscrição", flex: 2 },
  ];

  function actionButtonRenderer(params) {
    if (params.data.status === "approved") {
      return (
        <div className="flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-400 font-bold"
            onClick={() => {
              updateEnrollment(
                params.data.classId,
                params.data.userId,
                "pending"
              );
            }}
          >
            Resetar
          </button>
          <button
            className="text-orange-500 hover:text-orange-400 font-bold"
            onClick={() => {
              updateEnrollment(
                params.data.classId,
                params.data.userId,
                "rejected"
              );
            }}
          >
            Rejeitar
          </button>
        </div>
      );
    } else if (params.data.status === "rejected") {
      return (
        <div className="flex gap-2">
          <button
            className="text-green-500 hover:text-green-400 font-bold"
            onClick={() => {
              updateEnrollment(
                params.data.classId,
                params.data.userId,
                "approved"
              );
            }}
          >
            Aprovar
          </button>
          <button
            className="text-blue-500 hover:text-blue-400 font-bold"
            onClick={() => {
              updateEnrollment(
                params.data.classId,
                params.data.userId,
                "pending",
                false
              );
            }}
          >
            Resetar
          </button>
        </div>
      );
    }

    return (
      <div className="flex gap-2">
        <button
          className="text-green-500 hover:text-green-400 font-bold"
          onClick={() => {
            updateEnrollment(
              params.data.classId,
              params.data.userId,
              "approved"
            );
          }}
        >
          Aprovar
        </button>
        <button
          className="text-orange-500 hover:text-orange-400 font-bold"
          onClick={() => {
            updateEnrollment(
              params.data.classId,
              params.data.userId,
              "rejected",
              false
            );
          }}
        >
          Rejeitar
        </button>
      </div>
    );
  }

  async function updateEnrollment(
    classId: string,
    userId: string,
    status: "approved" | "rejected" | "pending",
    alterCount = true
  ) {
    try {
      const res = await fetch(`/api/enrollments/classId/${classId}`, {
        method: "PATCH",
        body: JSON.stringify({ status, userId, classId }),
      });

      const data = await res.json();

      const updatedRowData = rowData.map((row) =>
        row.classId === data[0].classId && row.userId === data[0].userId
          ? { ...row, status: data[0].status }
          : row
      );
      setRowData(updatedRowData);

      if (!alterCount) return;
      const countChange = data[0].status === "approved" ? 1 : -1;
      if (data[0].danceRole === "led") {
        setEnrollmentsCount((prevCount: IEnrollmentCounts) => {
          return { ...prevCount, led: prevCount.led + countChange };
        });
      } else if (data[0].danceRole === "leader") {
        setEnrollmentsCount((prevCount: IEnrollmentCounts) => {
          return { ...prevCount, leader: prevCount.leader + countChange };
        });
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  }

  useEffect(() => {
    async function handleReadEnrollments() {
      const enrollments = await readEnrollmentsByClassId(classId as string);
      setRowData(enrollments);

      const enrollmentsLedCount = enrollments.filter(
        (enrollment) =>
          enrollment.danceRole === "led" && enrollment.status === "approved"
      );
      const enrollmentsLeaderCount = enrollments.filter(
        (enrollment) =>
          enrollment.danceRole === "leader" && enrollment.status === "approved"
      );

      const currentClass = classes.find((c) => c.id === classId);
      if (!currentClass) return console.error("Class not found");
      setEnrollmentsCount({
        max: currentClass.size,
        led: enrollmentsLedCount.length,
        leader: enrollmentsLeaderCount.length,
      });
    }

    handleReadEnrollments();
  }, []);

  return (
    <AgGridReact
      className="w-full p-4"
      rowData={rowData}
      columnDefs={user?.userRole === "admin" ? columnDefs : columnDefsNonAdmin}
      overlayNoRowsTemplate="ㅤ"
    />
  );
}
