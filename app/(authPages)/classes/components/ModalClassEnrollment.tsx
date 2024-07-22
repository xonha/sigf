"use client";

import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Database } from "@/database.types";
import {
  deleteEnrollment,
  createEnrollment,
} from "@/app/api/enrollments/service";
import useUser from "@/hooks/useUser";
import { enrollmentsAtom } from "@/atoms/enrollmentsAtom";
import { modalIsOpenAtom, modalIdAtom } from "@/atoms/modalAtom";
import { toast } from "sonner";
import tw from "tailwind-styled-components";

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
    toast.info("Desinscrição em andamento...");
    const { data, error } = await useUser();
    if (error) return toast.error("Erro ao obter usuário");

    try {
      const filteredEnrollments = await deleteEnrollment(
        { classId, userId: data.user.id },
        enrollmentIds,
      );
      setEnrollmentIds(filteredEnrollments);
    } catch (error) {
      toast.error("Erro ao desinscrever");
      return;
    }
    setIsModalOpen(false);
    toast.success("Desinscrição realizada com sucesso!");
  }

  async function handleEnroll() {
    toast.info("Inscrição em andamento...");
    const { data, error } = await useUser();
    if (error) return toast.error("Erro ao obter usuário");

    try {
      const createdEnrollment = await createEnrollment({
        classId,
        userId: data.user.id,
        danceRolePreference,
        danceRole,
      });
      setEnrollmentIds([...enrollmentIds, createdEnrollment.classId]);
    } catch (error) {
      toast.error("Erro ao se inscrever");
      return;
    }
    setIsModalOpen(false);
    toast.success("Inscrição realizada com sucesso!");
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {!isEnrolled && (
        <>
          <Label>Papel</Label>
          <Select
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
          </Select>
          {danceRole === "indifferent" ? (
            <>
              <Label>Preferência</Label>
              <Select
                onChange={(e) =>
                  setDanceRolePreference(e.target.value as TDanceRolePreference)
                }
              >
                {Object.entries(optionalRoleOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </Select>
            </>
          ) : null}
        </>
      )}

      <ButtonContainer>
        {isEnrolled ? (
          <UnenrollButton onClick={handleUnenroll}>Desinscrever</UnenrollButton>
        ) : (
          <EnrollButton onClick={handleEnroll}>Inscrever</EnrollButton>
        )}
        <CloseButton
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(false);
          }}
        >
          Fechar
        </CloseButton>
      </ButtonContainer>
    </Form>
  );
}

const Form = tw.form`flex-1 flex flex-col w-full justify-center gap-2 text-foreground`;
const Label = tw.label`text-md`;
const Select = tw.select`rounded-md px-4 py-2 bg-inherit border mb-6`;
const ButtonContainer = tw.div`flex flex-row-reverse gap-4`;
const UnenrollButton = tw.button`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded`;
const EnrollButton = tw.button`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded`;
const CloseButton = tw.button`border border-gray-700 rounded px-4 py-2 text-black`;
