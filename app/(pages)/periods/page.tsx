"use client";

import { TPeriod } from "@/app/api/periods/route";
import {
  modalIsOpenAtom,
  modalOptionsAtom,
  modalIdAtom,
  TModalOptions,
} from "@/app/atoms/modalAtom";
import { periodsAtom } from "@/app/atoms/periodsAtom";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
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

export default function () {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setPeriodId = useSetRecoilState(modalIdAtom);
  const [periods, setPeriods] = useRecoilState<TPeriod[]>(periodsAtom);

  const columnDefs: ColDef<TPeriod>[] = [
    { field: "active", headerName: "Ativo", flex: 1 },
    { field: "semester", headerName: "Semestre", flex: 2 },
    { field: "year", headerName: "Ano", flex: 2 },
    { field: "startDate", headerName: "Início", flex: 2 },
    { field: "endDate", headerName: "Fim", flex: 2 },
    { headerName: "Ações", minWidth: 150, cellRenderer: actionCellRenderer },
  ];

  function openModal(modalOption: TModalOptions, periodId: string) {
    setModalOption(modalOption);
    setPeriodId(periodId);
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
          className="text-orange-500 hover:text-orange-400 font-bold"
          onClick={() => handleDeletePeriod(data.id ?? "")}
          data-action="delete"
        >
          Excluir
        </button>
      </div>
    );
  }

  return (
    <AgGridReact
      className="w-full p-4"
      rowData={periods}
      columnDefs={columnDefs}
      overlayNoRowsTemplate="ㅤ"
    />
  );
}
