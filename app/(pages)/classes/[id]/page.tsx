"use client";

import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IRow {
  classId: string;
  userId: string;
  status: Database["public"]["Enums"]["enrollmentStatus"];
  attendance: string;
  createdAt: Date;
  users_view: {
    name: string;
    email: string;
  };
  actionButton?: React.ReactNode;
}

export default function ClassesIdPage() {
  const classId = useParams().id;
  const [rowData, setRowData] = useState<IRow[]>([]);
  const columnDefs: ColDef<IRow>[] = [
    { field: "users_view.name", headerName: "Nome", flex: 3 },
    { field: "users_view.email", headerName: "Email", flex: 3 },
    {
      field: "createdAt",
      headerName: "Data da Inscrição",
      cellDataType: "date",
      flex: 2,
      editable: true,
      cellEditor: "agDateCellEditor",
    },
    {
      field: "status",
      headerName: "Inscrição",
      flex: 2,
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["pending", "approved", "rejected"],
      },
    },
    {
      field: "actionButton",
      headerName: "Ação",
      flex: 2,
      cellRenderer: actionButtonRenderer,
    },
  ];

  function actionButtonRenderer(params) {
    if (params.data.status === "approved") {
      return (
        <button
          className="text-red-500 hover:text-red-700 font-bold"
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
      );
    }

    return (
      <button
        className="text-green-500 hover:text-green-700 font-bold"
        onClick={() => {
          updateEnrollment(params.data.classId, params.data.userId, "approved");
        }}
      >
        Aprovar
      </button>
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
    <div
      className="ag-theme-quartz m-4"
      style={{ width: "100%", fontFamily: "monospace" }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
    </div>
  );
}
