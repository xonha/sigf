"use client";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

interface IRow {
  createdAt: string;
  semester: string;
  year: string;
  active: boolean;
  startDate: string;
  endDate: string;
  actionButton?: React.ReactNode;
}

export default function PeriodsPage() {
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [columnDefs, _] = useState<ColDef<IRow>[]>([
    { field: "active", headerName: "Ativo", flex: 1 },
    { field: "semester", headerName: "Semestre", flex: 2 },
    { field: "year", headerName: "Ano", flex: 2 },
    { field: "startDate", headerName: "Início", flex: 2 },
    { field: "endDate", headerName: "Fim", flex: 2 },
  ]);

  async function fetchPeriods() {
    try {
      const res = await fetch(`/api/periods`);
      const res_data = await res.json();

      setRowData(res_data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  }

  useEffect(() => {
    fetchPeriods();
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
