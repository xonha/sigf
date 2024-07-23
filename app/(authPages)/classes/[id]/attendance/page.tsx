"use client";

import { useModal } from "@/app/components/MainModal";
import { classDatesAtom } from "@/atoms/classDatesAtom";
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
  const openModal = useModal();
  // TODO: Fix this any, using classDatesAtom but types are incorrect
  const [rowData, setRowData] = useRecoilState<IClassDatesRow[]>(
    classDatesAtom as any,
  );
  const columnDefs: ColDef<IClassDatesRow>[] = [
    { field: "day", headerName: "Dia", flex: 1 },
    {
      field: "date",
      headerName: "Data",
      flex: 1,
      valueFormatter: ({ value }) =>
        new Date(value).toLocaleDateString("pt-BR"),
    },
    { headerName: "Presenças", flex: 1, cellRenderer: attendanceCellRenderer },
  ];

  function attendanceCellRenderer(params: any) {
    const classDateData: IClassDatesRow = params.data;
    return (
      <div className="flex gap-4">
        <a
          className="text-green-500 hover:text-green-400 font-bold"
          href={`${pathname}/${classDateData.id}`}
        >
          Registrar
        </a>
        <button
          className="text-orange-500 hover:text-orange-400 font-bold"
          onClick={() =>
            openModal("confirmation", "", () =>
              deleteClassDate(classDateData.id),
            )
          }
        >
          Excluir
        </button>
      </div>
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
