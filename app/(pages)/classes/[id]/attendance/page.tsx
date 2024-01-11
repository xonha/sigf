"use client";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IRow {
  id: string;
  date: string;
  day: string;
  classes: {
    id: string;
    name: string;
  };
}

export default function AttendancePage() {
  const classId = useParams().id;
  const [rowData, setRowData] = useState<IRow[]>([]);
  const columnDefs: ColDef<IRow>[] = [
    { field: "classes.name", headerName: "Nome", flex: 1 },
    { field: "day", headerName: "Dia", flex: 1 },
    { field: "date", headerName: "Data", flex: 1 },
    { headerName: "Ações", flex: 1, cellRenderer: actionsCellRenderer },
  ];

  function actionsCellRenderer(params: any) {
    const data: IRow = params.data;
    return (
      <div className="flex justify-content-center">
        <a
          className="text-blue-500 hover:text-blue-400 font-bold"
          href={`/classes/${data.classes.id}/attendance/${data.id}`}
        >
          Editar
        </a>
      </div>
    );
  }

  async function fetchClassDates() {
    try {
      const res = await fetch(`/api/classDates/${classId}`);
      const res_data = await res.json();

      const new_res_data = res_data.map((row) => {
        const date = new Date(row.date);
        const day = date.toLocaleDateString("pt-BR", { weekday: "long" });
        return { ...row, day };
      });

      setRowData(new_res_data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  }

  useEffect(() => {
    fetchClassDates();
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
