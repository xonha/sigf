"use client";

import { periodsAtom } from "@/app/utils/atoms/periodsAtom";
import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ModalEditPeriods, {
  ModalEditPeriodRef,
} from "./components/ModalEditPeriods";

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
    { headerName: "Ações", minWidth: 150, cellRenderer: actionCellRenderer },
  ]);

  async function deletePeriod(id: string) {
    try {
      await fetch(`/api/periods`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      await fetchPeriods();
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  }

  function actionCellRenderer({
    data,
  }: {
    data: Database["public"]["Tables"]["period"]["Row"];
  }) {
    const modalPeriodsRef = useRef<ModalEditPeriodRef>(null);

    return (
      <div className="flex gap-2 w-full">
        <ModalEditPeriods ref={modalPeriodsRef} data={data} />

        <button
          className="action-button edit bg-green-500 hover:bg-green-600 text-white font-bold px-4 rounded h-full"
          onClick={() => modalPeriodsRef.current?.toggleModal()}
          data-action="edit"
        >
          Editar
        </button>
        <button
          className="action-button delete bg-red-500 hover:bg-red-600 text-white font-bold px-4 rounded h-full"
          onClick={() => deletePeriod(data.id)}
          data-action="delete"
        >
          Excluir
        </button>
      </div>
    );
  }

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
