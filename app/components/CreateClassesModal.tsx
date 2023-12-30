import { classesAtom } from "@/app/utils/atoms/classesAtom";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useSetRecoilState } from "recoil";
import MainModal from "./MainModal";

export interface CreateClassesModalRef {
  toggleModal: () => void;
}

export default React.forwardRef<CreateClassesModalRef>((_, ref) => {
  const setClasses = useSetRecoilState(classesAtom);
  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

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
      setIsModalOpen(false);
      setName("");
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
            onClick={() => setIsModalOpen(false)}
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
    </>
  );
});
