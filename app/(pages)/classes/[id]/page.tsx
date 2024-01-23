"use client";

import { usersAtom } from "@/app/utils/atoms/usersAtom";
import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

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
            className="text-red-500 hover:text-red-400 font-bold"
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
                "pending"
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
          className="text-red-500 hover:text-red-400 font-bold"
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
  }

  async function updateEnrollment(
    classId: string,
    userId: string,
    status: string
  ) {
    try {
      const res = await fetch(`/api/enrollments/classId/${classId}`, {
        method: "PATCH",
        body: JSON.stringify({ status, userId, classId }),
      });

      const data = await res.json();

      const new_row_data = rowData.map((row) => {
        if (row.classId === data[0].classId && row.userId === data[0].userId) {
          row.status = data[0].status;
        }
        return row;
      });
      setRowData(new_row_data);
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  }

  async function fetchEnrollments() {
    try {
      const res = await fetch(`/api/enrollments/classId/${classId}`);
      const res_data = await res.json();

      const new_res_data = res_data.map((row) => {
        row.createdAt = new Date(row.createdAt);
        return row;
      });

      setRowData(new_res_data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  }

  useEffect(() => {
    fetchEnrollments();
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
