"use client";

import { classDatesAtom } from "@/app/atoms/classDatesAtom";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export interface IClassDatesRow {
  id: string;
  date: string;
  day: string;
}

export default function AttendancePage() {
  const pathname = usePathname();
  const classId = useParams().id;
  // TODO: Fix this any, using classDatesAtom but types are incorrect
  const [rowData, setRowData] = useRecoilState<IClassDatesRow[]>(
    classDatesAtom as any
  );
  const columnDefs: ColDef<IClassDatesRow>[] = [
    { field: "day", headerName: "Dia", flex: 1 },
    { field: "date", headerName: "Data", flex: 1 },
    { headerName: "Presenças", flex: 1, cellRenderer: attendanceCellRenderer },
    { headerName: "Ações", flex: 1, cellRenderer: actionsCellRenderer },
  ];

  function actionsCellRenderer(params: any) {
    const data: IClassDatesRow = params.data;
    return (
      <div className="flex gap-4">
        <button
          className="text-blue-500 hover:text-blue-400 font-bold"
          onClick={() => {
            console.log("Editando", data.id);
          }}
        >
          Editar
        </button>
        <button
          className="text-orange-500 hover:text-orange-400 font-bold"
          onClick={() => deleteClassDate(params.data.id)}
        >
          Deletar
        </button>
      </div>
    );
  }

  function attendanceCellRenderer(params: any) {
    const classDateData: IClassDatesRow = params.data;
    return (
      <a
        className="text-green-500 hover:text-green-400 font-bold"
        href={`${pathname}/${classDateData.id}`}
      >
        Registrar
      </a>
    );
  }

  async function deleteClassDate(classDateId: string) {
    try {
      const res = await fetch(`/api/classDates/${classDateId}`, {
        method: "DELETE",
      });

      await res.json();
      const new_res_data = rowData.filter((row) => row.id !== classDateId);

      setRowData(new_res_data);
    } catch (error) {
      console.error("Error deleting class date:", error);
    }
  }

  async function fetchClassDates() {
    try {
      const res = await fetch(`/api/classDates/${classId}`);
      const res_data = await res.json();

      const new_res_data = res_data.map((row) => {
        const date = new Date(row.date + "EDT");

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
    <AgGridReact
      className="w-full p-4"
      rowData={rowData}
      columnDefs={columnDefs}
      overlayNoRowsTemplate="ㅤ"
    />
  );
}
