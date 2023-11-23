import { useOutsideClick } from "@/Hooks/useClickOutside";
import { classesAtom } from "@/app/atoms/classesAtom";
import { useRef, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import EditClassesModal from "./EditClassesModal";

interface ClassesOptionsButtonProps {
  id: string;
}

export default function ClassesOptionsButton(props: ClassesOptionsButtonProps) {
  const { id } = props;
  const [classes, setClasses] = useRecoilState(classesAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOptionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const optionsMenuRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
    setOptionsMenuVisible(false);
  };
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

  return (
    <>
      <EditClassesModal
        id={id}
        isModalOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
      <div className="relative">
        <button onClick={toggleOptionsMenu}>
          <FaEllipsisVertical />
        </button>
        {isOptionsMenuVisible && (
          <div
            className="absolute right-4 bg-white border rounded-[10px] w-32 flex flex-col gap-2 p-2"
            ref={optionsMenuRef}
          >
            <button onClick={openModal}>Editar</button>
            <button onClick={() => deleteClass(id)}>Excluir</button>
          </div>
        )}
      </div>
    </>
  );
}
