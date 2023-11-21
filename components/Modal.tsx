import { ClassesPostBody } from "@/app/api/classes/route";
import { newClassAtom } from "@/app/atoms/newClassAtom";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";

Modal.setAppElement("#__create_class");

interface ModalMenuProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function ModalMenu({
  isOpen,
  onRequestClose,
}: ModalMenuProps): React.ReactElement {
  const [, setNewClass] = useRecoilState(newClassAtom);
  const [name, setName] = useState("");

  const customStyles = {
    content: {
      width: "265px",
      height: "126px",
      margin: "auto",
    },
  };

  useEffect(() => {
    async function fetchClasses() {
      try {
        const res = await fetch("/api/classes");
        const data = await res.json();
        setNewClass(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }

    fetchClasses();
  }, []);

  async function createClass(className: string) {
    try {
      const body: ClassesPostBody = { name: className };

      await fetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const res = await fetch("/api/classes");
      const data = await res.json();
      setNewClass(data);
      setName("");

      onRequestClose();
    } catch (error) {
      console.error("Error creating class:", error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal Menu"
      style={customStyles}
    >
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
    </Modal>
  );
}
