"use client";

import { periodsAtom } from "@/app/utils/atoms/periodsAtom";
import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function PeriodsPage() {
  const [periods, setPeriods] =
    useRecoilState<Database["public"]["Tables"]["period"]["Insert"][]>(
      periodsAtom
    );

  const [columnDefs, _] = useState<
    ColDef<Database["public"]["Tables"]["period"]["Insert"]>[]
  >([
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

      setPeriods(res_data);
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
      <AgGridReact rowData={periods} columnDefs={columnDefs} />
    </div>
  );
}
