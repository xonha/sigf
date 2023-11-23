import { classesAtom } from "@/app/atoms/classesAtom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import MainModal from "./MainModal";
import { on } from "events";

interface MainModalProps {
  onRequestClose?: () => void;
}

export default function CreateClassesModal({
  onRequestClose,
}: MainModalProps): React.ReactElement {
  const [, setClasses] = useRecoilState(classesAtom);
  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await fetch("/api/classes");
        const data = await res.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }

    fetchClasses();
  }, []);

  async function createClass(className: string) {
    try {
      const body = { name: className };

      await fetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data);
      setName("");

      onRequestClose?.();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  }

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={toggleModal}>
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
            onClick={() => createClass(name)}
          >
            Criar
          </button>
        </div>
      </MainModal>
      <button
        onClick={toggleModal}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Criar Turma
      </button>
    </>
  );
}
