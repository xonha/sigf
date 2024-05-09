"use client";

import { modalIdAtom, modalIsOpenAtom } from "@/app/utils/atoms/modalAtom";
import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Database } from "@/database.types";
import {
  deleteEnrollment,
  createEnrollment,
} from "@/app/api/enrollments/controller";
import useUser from "@/app/utils/hooks/useUser";
import { enrollmentsAtom } from "@/app/utils/atoms/enrollmentsAtom";

export type TDanceRole = Database["public"]["Enums"]["danceRole"];
export type TDanceRolePreference =
  Database["public"]["Enums"]["danceRolePreference"];

export default function ModalClassEnrollment() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const classId = useRecoilValue(modalIdAtom);
  const [enrollmentIds, setEnrollmentIds] = useRecoilState(enrollmentsAtom);
  const isEnrolled = enrollmentIds.includes(classId as never);
  const [danceRole, setDanceRole] = useState<TDanceRole>("led");
  const [danceRolePreference, setDanceRolePreference] =
    useState<TDanceRolePreference>("led");
  const optionalRoleOptions = {
    led: "Conduzido(a)",
    leader: "Condutor(a)",
  };
  const rolesOptions = {
    ...optionalRoleOptions,
    indifferent: "Indiferente",
  };

  async function handleUnenroll() {
    const { data, error } = await useUser();
    if (error) return console.error("Error getting user:", error);

    const filteredEnrollments = await deleteEnrollment(
      { classId, userId: data.user.id },
      enrollmentIds,
    );
    setEnrollmentIds(filteredEnrollments);
  }

  async function handleEnroll() {
    const { data, error } = await useUser();
    if (error) return console.error("Error getting user:", error);

    const createdEnrollment = await createEnrollment({
      classId,
      userId: data.user.id,
      danceRolePreference,
      danceRole,
    });
    setEnrollmentIds([...enrollmentIds, createdEnrollment.classId]);
  }

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label className="text-md">Papel</label>
      <select
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        onChange={(e) => {
          const value = e.target.value as TDanceRole;
          setDanceRole(value);
          if (value !== "indifferent") setDanceRolePreference(value);
        }}
      >
        {Object.entries(rolesOptions).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
      {danceRole === "indifferent" ? (
        <>
          <label className="text-md">Preferência</label>
          <select
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            onChange={(e) =>
              setDanceRolePreference(e.target.value as TDanceRolePreference)
            }
          >
            {Object.entries(optionalRoleOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </>
      ) : null}

      <div className="flex flex-row-reverse gap-4">
        {isEnrolled ? (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleUnenroll}
          >
            Desinscrever
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleEnroll}
          >
            Inscrever
          </button>
        )}
        <button
          className="border border-gray-700 rounded px-4 py-2 text-black"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
