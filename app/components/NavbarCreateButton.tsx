"use client";
import { useRef } from "react";
import CreateClassesModal, {
  CreateClassesModalRef,
} from "./CreateClassesModal";

export default function NavbarCreateButton() {
  const modalRef = useRef<CreateClassesModalRef>(null);

  function toggleModal() {
    modalRef.current?.toggleModal();
  }

  return (
    <div>
      <CreateClassesModal ref={modalRef} />
      <button
        onClick={toggleModal}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        Criar Turma
      </button>
    </div>
  );
}
