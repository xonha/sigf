"use client";

import { TAttendanceWithClassDates } from "@/app/api/attendance/service";
import { attendancesAtom } from "@/atoms/attendanceAtom";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useRecoilValue } from "recoil";
import tw from "tailwind-styled-components";

const weekDays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
];

const presenceOptions = {
  present: "Presente",
  absent: "Ausente",
  justified: "Justificada",
  notRegistered: "Não Registrada",
};

export default function AttendancePage() {
  const attendances = useRecoilValue(attendancesAtom);
  const columnDefs: ColDef<TAttendanceWithClassDates>[] = [
    {
      field: "classDates.date",
      headerName: "Dia",
      flex: 1,
      valueFormatter: ({ value }) => weekDays[new Date(value).getDay()],
    },
    {
      field: "classDates.date",
      headerName: "Data",
      flex: 1,
      valueFormatter: ({ value }) =>
        new Date(value).toLocaleDateString("pt-BR"),
    },

    {
      field: "presence",
      headerName: "Presença",
      flex: 1,
      cellRenderer: ({ value }) => (
        <PresenceColor value={value}>{presenceOptions[value]}</PresenceColor>
      ),
    },
  ];

  return (
    <AgGridReact
      className="w-full p-4"
      rowData={attendances}
      columnDefs={columnDefs}
      overlayNoRowsTemplate="ㅤ"
    />
  );
}

const PresenceColor = tw.p<{ value: keyof typeof presenceOptions }>`
  font-bold
  ${(p) => {
    switch (p.value) {
      case "present":
        return "text-green-500";
      case "absent":
        return "text-orange-500";
      case "justified":
        return "text-blue-500";
    }
  }}
`;
