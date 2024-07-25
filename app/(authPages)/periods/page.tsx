"use client";

import { TPeriod } from "@/app/api/periods/route";
import { deletePeriod } from "@/app/api/periods/service";
import { periodsAtom } from "@/atoms/periodsAtom";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { periodsOptions } from "../classes/components/ModalClasses";
import { useModal } from "@/app/components/MainModal";

export default function PeriodsPage() {
  const [periods, setPeriods] = useRecoilState<TPeriod[]>(periodsAtom);
  const openModal = useModal();

  const columnDefs: ColDef<TPeriod>[] = [
    {
      field: "semester",
      headerName: "Semestre",
      flex: 2,
      valueFormatter: ({ value }) => periodsOptions[value],
    },
    { field: "year", headerName: "Ano", flex: 2 },
    {
      field: "startDate",
      headerName: "Início",
      flex: 2,
      valueFormatter: ({ value }) =>
        new Date(value + "EDT").toLocaleDateString("pt-BR"),
    },
    {
      field: "endDate",
      headerName: "Fim",
      flex: 2,
      valueFormatter: ({ value }) =>
        new Date(value + "EDT").toLocaleDateString("pt-BR"),
    },
    { headerName: "Ações", minWidth: 150, cellRenderer: actionCellRenderer },
  ];

  async function handleDeletePeriod(periodId: string) {
    toast.info("Excluindo período...");
    try {
      await deletePeriod(periodId);
    } catch (error: any) {
      if (error.response.status === 409) toast.error("Período em uso!");
      else toast.error("Erro ao excluir período");
      return;
    }
    setPeriods((prevPeriods) => {
      const newPeriods = prevPeriods.filter((period) => period.id !== periodId);
      return newPeriods;
    });
    toast.success("Período excluído com sucesso!");
  }

  function actionCellRenderer({ data }: { data: TPeriod }) {
    return (
      <div className="flex gap-2 w-full">
        <button
          className="text-blue-500 hover:text-blue-600 font-bold"
          onClick={() => openModal("periods", data.id ?? "")}
          data-action="edit"
        >
          Editar
        </button>
        <button
          className="text-orange-500 hover:text-orange-600 font-bold"
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
