import { classesAtom } from "@/app/atoms/classesAtom";
import { useOutsideClick } from "@/app/hooks/useClickOutside";
import { useRef, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import EditClassesModal, { EditClassesModalRef } from "./EditClassesModal";

export default function ClassesOptionsButton(props: { id: string }) {
  const { id } = props;
  const [classes, setClasses] = useRecoilState(classesAtom);
  const [isOptionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<EditClassesModalRef>(null);

  const toggleOptionsMenu = () => {
    setOptionsMenuVisible((prev) => !prev);
  };

  useOutsideClick(optionsMenuRef, toggleOptionsMenu);

  async function deleteClass(id: string) {
    try {
      await fetch(`/api/classes/${id}`, {
        method: "DELETE",
      });
      const newClasses = classes.filter((classItem) => classItem.id !== id);
      setClasses(newClasses);
    } catch (error) {
      console.error("Error deleting class:", error);
    }
  }

  function toggleModal() {
    modalRef.current?.toggleModal();
  }

  return (
    <>
      <EditClassesModal id={id} ref={modalRef} />
      <div className="relative">
        <button onClick={toggleOptionsMenu}>
          <FaEllipsisVertical />
        </button>
        {isOptionsMenuVisible && (
          <div
            className="absolute right-4 bg-white border rounded-[10px] w-32 flex flex-col gap-2 p-2"
            ref={optionsMenuRef}
          >
            <button onClick={toggleModal}>Editar</button>
            <button onClick={() => deleteClass(id)}>Excluir</button>
          </div>
        )}
      </div>
    </>
  );
}
