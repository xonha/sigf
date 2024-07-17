"use client";

import { readClasses } from "@/app/api/classes/controller";
import { readEnrollmentsByClassId } from "@/app/api/enrollments/controller";
import { classesAtom } from "@/atoms/classesAtom";
import {
  enrollmentCountAtom,
  IEnrollmentCounts,
} from "@/atoms/enrollmentsAtom";
import { usersAtom } from "@/atoms/usersAtom";
import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface IRow {
  classId: string;
  userId: string;
  status: Database["public"]["Enums"]["enrollmentStatus"];
  attendance: string;
  danceRole: Database["public"]["Enums"]["danceRole"];
  danceRolePreference: Database["public"]["Enums"]["danceRolePreference"];
  createdAt: Date;
  users_view: {
    name: string;
    email: string;
  };
  actionButton?: React.ReactNode;
}

const danceRoleOptions = {
  led: "Condutor(a)",
  leader: "Conduzido(a)",
  indifferent: "Indiferente",
};

const enrollmentStatusOptions = {
  approved: "Aprovado",
  pending: "Pendente",
  rejected: "Rejeitado",
};

export default function ClassesIdPage() {
  const user = useRecoilValue(usersAtom);
  const setEnrollmentsCount = useSetRecoilState(enrollmentCountAtom);
  const classes = useRecoilValue(classesAtom);
  const classId = useParams().id;
  const [rowData, setRowData] = useState<IRow[]>([]);
  const columnDefs: ColDef<IRow>[] = [
    { field: "users_view.name", headerName: "Nome", flex: 3 },
    { field: "users_view.email", headerName: "Email", flex: 3 },
    {
      field: "createdAt",
      headerName: "Data da inscrição",
      flex: 3,
      valueFormatter: ({ value }) =>
        new Date(value).toLocaleDateString("pt-BR"),
    },
    {
      field: "danceRole",
      headerName: "Papel",
      flex: 2,
      valueFormatter: ({ value }) => danceRoleOptions[value],
    },
    {
      field: "danceRolePreference",
      headerName: "Preferência",
      flex: 2,
      valueFormatter: ({ value }) => danceRoleOptions[value],
    },
    {
      field: "status",
      headerName: "Inscrição",
      flex: 2,
      valueFormatter: ({ value }) => enrollmentStatusOptions[value],
    },
    {
      field: "actionButton",
      headerName: "Ações",
      flex: 3,
      cellRenderer: actionButtonRenderer,
    },
  ];
  const columnDefsNonAdmin: ColDef<IRow>[] = [
    { field: "users_view.name", headerName: "Nome", flex: 3 },
    { field: "users_view.email", headerName: "Email", flex: 3 },
    { field: "createdAt", headerName: "Data da inscrição", flex: 3 },
    { field: "danceRole", headerName: "Papel", flex: 2 },
    { field: "status", headerName: "Inscrição", flex: 2 },
  ];

  function actionButtonRenderer(params: { data: IRow }) {
    const { classId, userId, status } = params.data;

    const renderButton = (
      buttonStatus: "pending" | "approved" | "rejected",
      text: string,
      color: string,
      hoverColor: string,
      alterCount = true,
    ) => (
      <button
        key={buttonStatus}
        className={`${color} ${hoverColor} font-bold`}
        onClick={() =>
          updateEnrollment(classId, userId, buttonStatus, alterCount)
        }
      >
        {text}
      </button>
    );

    const getButtonsForStatus = (
      currentStatus: "pending" | "approved" | "rejected",
    ) => {
      switch (currentStatus) {
        case "approved":
          return [
            renderButton(
              "pending",
              "Resetar",
              "text-blue-500",
              "hover:text-blue-400",
            ),
            renderButton(
              "rejected",
              "Rejeitar",
              "text-orange-500",
              "hover:text-orange-400",
            ),
          ];
        case "rejected":
          return [
            renderButton(
              "approved",
              "Aprovar",
              "text-green-500",
              "hover:text-green-400",
            ),
            renderButton(
              "pending",
              "Resetar",
              "text-blue-500",
              "hover:text-blue-400",
              false,
            ),
          ];
        default:
          return [
            renderButton(
              "approved",
              "Aprovar",
              "text-green-500",
              "hover:text-green-400",
            ),
            renderButton(
              "rejected",
              "Rejeitar",
              "text-orange-500",
              "hover:text-orange-400",
              false,
            ),
          ];
      }
    };

    return <div className="flex gap-2">{getButtonsForStatus(status)}</div>;
  }

  async function updateEnrollment(
    classId: string,
    userId: string,
    status: "approved" | "rejected" | "pending",
    alterCount = true,
  ) {
    try {
      const res = await fetch(`/api/enrollments/classId/${classId}`, {
        method: "PATCH",
        body: JSON.stringify({ status, userId, classId }),
      });

      const data = await res.json();

      const updatedRowData = rowData.map((row) =>
        row.classId === data[0].classId && row.userId === data[0].userId
          ? { ...row, status: data[0].status }
          : row,
      );
      setRowData(updatedRowData);

      if (!alterCount) return;
      const countChange = data[0].status === "approved" ? 1 : -1;
      if (data[0].danceRolePreference === "led") {
        setEnrollmentsCount((prevCount: IEnrollmentCounts) => {
          return { ...prevCount, led: prevCount.led + countChange };
        });
      } else if (data[0].danceRolePreference === "leader") {
        setEnrollmentsCount((prevCount: IEnrollmentCounts) => {
          return { ...prevCount, leader: prevCount.leader + countChange };
        });
      }
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  }

  useEffect(() => {
    async function handleReadEnrollments() {
      console.log("classId", classId);
      const enrollments = await readEnrollmentsByClassId(classId as string);
      console.log("enrollments", enrollments);
      setRowData(enrollments);

      const enrollmentsLedCount = enrollments.filter(
        (enrollment) =>
          enrollment.danceRolePreference === "led" &&
          enrollment.status === "approved",
      );
      const enrollmentsLeaderCount = enrollments.filter(
        (enrollment) =>
          enrollment.danceRolePreference === "leader" &&
          enrollment.status === "approved",
      );

      const classes = await readClasses();
      const currentClass = classes.find(
        (currentClass) => currentClass.id === classId,
      );
      if (!currentClass) return console.error("Class not found");
      console.log("currentClass", currentClass);
      setEnrollmentsCount({
        max: currentClass.size,
        led: enrollmentsLedCount.length,
        leader: enrollmentsLeaderCount.length,
      });
    }

    handleReadEnrollments();
  }, []);

  return (
    <AgGridReact
      className="w-full p-4"
      rowData={rowData}
      columnDefs={user?.userRole === "admin" ? columnDefs : columnDefsNonAdmin}
      overlayNoRowsTemplate="ㅤ"
    />
  );
}
