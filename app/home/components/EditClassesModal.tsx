import { classesAtom } from "@/app/atoms/classesAtom";
import MainModal from "@/components/MainModal";
import React, { useState } from "react";
import { useRecoilState } from "recoil";

interface EditClassesModalProps {
  onRequestClose: () => void;
  isModalOpen: boolean;
  id: string;
}

export default function EditClassesModal({
  onRequestClose,
  isModalOpen,
  id,
}: EditClassesModalProps): React.ReactElement {
  const [, setClasses] = useRecoilState(classesAtom);
  const [name, setName] = useState("");

  async function editClass(id: string, className: string) {
    try {
      const body = { name: className };

      await fetch(`/api/classes/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });

      const response = await fetch("/api/classes");
      const newClasses = await response.json();
      setClasses(newClasses);

      onRequestClose?.();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  }

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={onRequestClose}>
        <div className="flex gap-4">
          <h2>Nome:</h2>
          <input
            type="text"
            placeholder="Avançada 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[160px] border rounded pl-2"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="border border-gray-700 rounded px-4 py-2 text-black"
            onClick={onRequestClose}
          >
            Fechar
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => editClass(id, name)}
          >
            Salvar
          </button>
        </div>
      </MainModal>
    </>
  );
}
