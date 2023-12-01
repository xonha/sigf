"use client";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";

interface IRow {
  nome: string;
  company: string;
  location: string;
}

export default function Content() {
  const [rowData, setRowData] = useState<IRow[]>([
    {
      nome: "Voyager",
      company: "NASA",
      location: "Cape Canaveral",
    },
    {
      nome: "Apollo 13",
      company: "NASA",
      location: "Kennedy Space Center",
    },
    {
      nome: "Falcon 9",
      company: "SpaceX",
      location: "Cape Canaveral",
    },
  ]);

  const [colDefs, setColDefs] = useState<ColDef<IRow>[]>([
    { field: "nome", flex: 3 },
    { field: "company", flex: 2 },
    { field: "location", flex: 2 },
  ]);

  return (
    <div
      className="ag-theme-quartz m-4"
      style={{ width: "100%", fontFamily: "monospace" }}
    >
      <AgGridReact rowData={rowData} columnDefs={colDefs} />
    </div>
  );
}
