"use client";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttendanceCellRenderer from "./components/AttendanceCellRenderer";

interface IRow {
  classId: string;
  userId: string;
  status: string;
  attendance: string;
  createdAt: string;
  users_view: {
    name: string;
    email: string;
  };
  actionButton?: React.ReactNode;
}

export default function ClassesIdPage() {
  const route = useParams();
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [columnDefs, _] = useState<ColDef<IRow>[]>([
    { field: "users_view.name", headerName: "Nome", flex: 2 },
    { field: "users_view.email", headerName: "Email", flex: 2 },
    { field: "status", headerName: "Status da Inscrição", flex: 2 },
    { field: "createdAt", headerName: "Data da Inscrição", flex: 2 },
    {
      field: "attendance",
      headerName: "Ações",
      flex: 2,
      cellRenderer: AttendanceCellRenderer,
    },
  ]);

  async function fetchEnrollments() {
    try {
      const res = await fetch(`/api/enrollments/classId/${route.id}`);
      const res_data = await res.json();

      setRowData(res_data);
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
