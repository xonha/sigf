// ModalMenu.tsx
import { newClassAtom } from "@/app/atoms/newClassAtom";
import React from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";

Modal.setAppElement("#__create_class");

interface ModalMenuProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const [newClass, setNewClass] = useRecoilState(newClassAtom);

async function createClass() {
  const res = await fetch("/api/classes", {
    method: "POST",
    body: JSON.stringify({
      name: "Avançada 1",
    }),
  });

  const data = await res.json();

  setNewClass(data);
}

const ModalMenu: React.FC<ModalMenuProps> = ({ isOpen, onRequestClose }) => {
  const customStyles = {
    content: {
      width: "265px",
      height: "20%",
      margin: "auto",
    },
  };

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
          placeholder=" Avançada 1"
          className="w-[160px] border rounded"
        />
      </div>
      <button onClick={onRequestClose}>Fechar</button>
      <button>Criar</button>
    </Modal>
  );
};

export default ModalMenu;
