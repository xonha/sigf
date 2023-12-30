"use client";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AttendanceCellRenderer from "./AttendanceCellRenderer";

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

export default function Content() {
  const route = useParams();
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [columnDefs, _] = useState<ColDef<IRow>[]>([
    { field: "users_view.name", headerName: "Nome", flex: 2 },
    { field: "users_view.email", headerName: "Email", flex: 2 },
    { field: "status", headerName: "Inscrição", flex: 2 },
    { field: "createdAt", headerName: "Data", flex: 2 },
    {
      field: "attendance",
      headerName: "Presença",
      flex: 2,
      cellRenderer: AttendanceCellRenderer,
    },
  ]);

  function formatDateString(dateString: string | number | Date) {
    const dateObject = new Date(dateString);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(dateObject);

    console.log(formattedDate);

    return formattedDate;
  }

  async function fetchEnrollments() {
    try {
      const res = await fetch(`/api/enrollments/classId/${route.id}`);
      const res_data = await res.json();

      const formattedData = res_data.map(
        (row: { createdAt: string | number | Date }) => ({
          ...row,
          createdAt: formatDateString(row.createdAt),
        })
      );

      setRowData(formattedData);
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
