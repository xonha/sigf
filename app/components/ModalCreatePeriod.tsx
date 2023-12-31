import React, { useImperativeHandle, useState } from "react";
import MainModal from "./MainModal";

export interface ModalCreatePeriodRef {
  toggleModal: () => void;
}

export default React.forwardRef<ModalCreatePeriodRef>((_, ref) => {
  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={toggleModal}>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/api/periods"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            // print all form data to console
            const data = new FormData(e.target as HTMLFormElement);
            for (const [key, value] of data.entries()) {
              console.log(key, value);
            }
          }}
        >
          <label className="text-md" htmlFor="year">
            Ano
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="year"
            placeholder="2024"
            required
          />
          <label className="text-md" htmlFor="semester">
            Semestre
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="semester"
            placeholder="primeiro"
            required
          />
          <label className="text-md" htmlFor="startDate">
            Data de Início
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="startDate"
            placeholder="2024-03-24"
            required
          />
          <label className="text-md" htmlFor="endDate">
            Data de Término
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="endDate"
            placeholder="2024-07-24"
            required
          />
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
      </MainModal>
    </>
  );
});
