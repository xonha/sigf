"use client";

import { TPeriod } from "@/app/api/periods/route";
import {
  TModalOptions,
  modalIdAtom,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "@/app/utils/atoms/modalAtom";
import { periodsAtom } from "@/app/utils/atoms/periodsAtom";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

async function deletePeriod(id: string) {
  try {
    const res = await fetch(`/api/periods`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
}

export default function PeriodsPage() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setModalId = useSetRecoilState(modalIdAtom);
  const [periods, setPeriods] = useRecoilState<TPeriod[]>(periodsAtom);

  const [columnDefs, _] = useState<ColDef<TPeriod>[]>([
    { field: "active", headerName: "Ativo", flex: 1 },
    { field: "semester", headerName: "Semestre", flex: 2 },
    { field: "year", headerName: "Ano", flex: 2 },
    { field: "startDate", headerName: "Início", flex: 2 },
    { field: "endDate", headerName: "Fim", flex: 2 },
    { headerName: "Ações", minWidth: 150, cellRenderer: actionCellRenderer },
  ]);

  function openModal(modalOption: TModalOptions, periodId: string) {
    setModalOption(modalOption);
    setModalId(periodId);
    setIsModalOpen(true);
  }

  function actionCellRenderer({ data }: { data: TPeriod }) {
    function handleDeletePeriod(periodId: string) {
      deletePeriod(periodId);
      setPeriods((prevPeriods) => {
        const newPeriods = prevPeriods.filter(
          (period) => period.id !== periodId
        );
        return newPeriods;
      });
    }

    return (
      <div className="flex gap-2 w-full">
        <button
          className="text-blue-500 hover:text-blue-400 font-bold"
          onClick={() => openModal("periods", data.id ?? "")}
          data-action="edit"
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:text-red-400 font-bold"
          onClick={() => handleDeletePeriod(data.id ?? "")}
          data-action="delete"
        >
          Excluir
        </button>
      </div>
    );
  }

  return (
    <div
      className="ag-theme-quartz m-4"
      style={{ width: "100%", fontFamily: "monospace" }}
    >
      <AgGridReact
        rowData={periods}
        columnDefs={columnDefs}
        overlayNoRowsTemplate="ㅤ"
      />
    </div>
  );
}
