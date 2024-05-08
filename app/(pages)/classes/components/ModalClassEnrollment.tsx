"use client";

import { modalIdAtom, modalIsOpenAtom } from "@/app/utils/atoms/modalAtom";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ButtonEnroll from "./ButtonEnroll";

export default function ModalClassEnrollment() {
  const modalId = useRecoilValue(modalIdAtom);
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={(e) => {
        console.log(modalId);

        e.preventDefault();
      }}
    >
      <ButtonEnroll classId={modalId} />
      <div className="flex flex-row-reverse gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Criar
        </button>
        <button
          className="border border-gray-700 rounded px-4 py-2 text-black"
          onClick={() => setIsModalOpen(false)}
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
