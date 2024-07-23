"use client";

import { readClasses } from "@/app/api/classes/controller";
import {
  readEnrollmentsByClassId,
  readEnrollmentsByUser,
  updateEnrollment,
} from "@/app/api/enrollments/service";
import { TEnrollmentRow, TEnrollmentUpdate } from "@/app/api/enrollments/types";
import {
  IEnrollmentCounts,
  enrollmentCountAtom,
} from "@/atoms/enrollmentsAtom";
import { usersAtom } from "@/atoms/usersAtom";
import { Database } from "@/database.types";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";

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
  led: "Conduzido(a)",
  leader: "Condutor(a)",
  indifferent: "Indiferente",
};

const enrollmentStatusOptions = {
  approved: "Aprovado",
  pending: "Pendente",
  rejected: "Rejeitado",
};

export default function ClassesIdPage() {
  const user = useRecoilValue(usersAtom);
  const classId = useParams().id;
  const [rowData, setRowData] = useState<IRow[]>([]);
  const [enrollmentsCount, setEnrollmentsCount] =
    useRecoilState(enrollmentCountAtom);

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
      buttonStatus: Database["public"]["Enums"]["enrollmentStatus"],
      text: string,
      color: string,
      hoverColor: string,
      alterCount = true,
    ) => (
      <button
        key={buttonStatus}
        className={`${color} ${hoverColor} font-bold`}
        onClick={() => handleUpdateEnrollment(buttonStatus, alterCount)}
      >
        {text}
      </button>
    );

    const getButtonsForStatus = (
      currentStatus: Database["public"]["Enums"]["enrollmentStatus"],
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

  function updateRowData(rowData: IRow[], enrollment: TEnrollmentRow): IRow[] {
    return rowData.map(
      (row: IRow): IRow =>
        row.classId === enrollment.classId && row.userId === enrollment.userId
          ? { ...row, status: enrollment.status }
          : row,
    );
  }

  function updateEnrollmentCount(enrollment: TEnrollmentRow): void {
    const countChange = enrollment.status === "approved" ? 1 : -1;
    const role = enrollment.danceRolePreference === "led" ? "led" : "leader";
    setEnrollmentsCount((prevCount: IEnrollmentCounts) => ({
      ...prevCount,
      [role]: prevCount[role] + countChange,
    }));
  }

  async function canBeEnrolledOnRole(
    enrollment: TEnrollmentRow,
    status: Database["public"]["Enums"]["enrollmentStatus"],
  ) {
    if (
      status === "approved" &&
      enrollment?.danceRolePreference &&
      enrollmentsCount[enrollment.danceRolePreference] >= enrollmentsCount.half
    ) {
      return false;
    }
    return true;
  }

  async function handleUpdateEnrollment(
    status: Database["public"]["Enums"]["enrollmentStatus"],
    alterCount = true,
  ): Promise<void> {
    const userEnrollments = await readEnrollmentsByUser();
    const enrollment = userEnrollments.find(
      (enrollment) => enrollment.classId === classId,
    );
    if (!enrollment) return console.error("Enrollment not found");
    const canBeEnrolled = await canBeEnrolledOnRole(enrollment, status);
    if (!canBeEnrolled) {
      toast.error(
        `Não é possível aprovar mais ${
          enrollment.danceRolePreference === "led" ? "conduzidxs" : "condutorxs"
        }`,
      );
      return;
    }

    try {
      const updatedEnrollment = await updateEnrollment({
        ...enrollment,
        status,
      });

      setRowData(updateRowData(rowData, updatedEnrollment));

      if (alterCount) updateEnrollmentCount(updatedEnrollment);
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  }

  useEffect(() => {
    async function handleReadEnrollments() {
      const enrollments = await readEnrollmentsByClassId(classId as string);
      setRowData(enrollments);

      const enrollmentsLedCount = enrollments.filter(
        (enrollment: {
          danceRolePreference: Database["public"]["Enums"]["danceRolePreference"];
          status: Database["public"]["Enums"]["enrollmentStatus"];
        }) =>
          enrollment.danceRolePreference === "led" &&
          enrollment.status === "approved",
      );
      const enrollmentsLeaderCount = enrollments.filter(
        (enrollment: {
          danceRolePreference: Database["public"]["Enums"]["danceRolePreference"];
          status: Database["public"]["Enums"]["enrollmentStatus"];
        }) =>
          enrollment.danceRolePreference === "leader" &&
          enrollment.status === "approved",
      );

      const classes = await readClasses();
      const currentClass = classes.find(
        (currentClass) => currentClass.id === classId,
      );
      if (!currentClass) return console.error("Class not found");
      setEnrollmentsCount({
        max: currentClass.size,
        half: currentClass.size / 2,
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
