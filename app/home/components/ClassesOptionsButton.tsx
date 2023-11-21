import { classesAtom } from "@/app/atoms/classesAtom";
import { useEffect, useRef, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useRecoilState } from "recoil";

interface ClassesOptionsButtonProps {
  id: string;
}

export default function ClassesOptionsButton(props: ClassesOptionsButtonProps) {
  const { id } = props;
  const [classes, setClasses] = useRecoilState(classesAtom);

  const [isOptionsMenuVisible, setOptionsMenuVisible] = useState(false);
  const toggleOptionsMenu = () => {
    setOptionsMenuVisible(!isOptionsMenuVisible);
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      setOptionsMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    <button ref={buttonRef} onClick={toggleOptionsMenu}>
      <FaEllipsisVertical />
      {isOptionsMenuVisible && (
        <ul className="absolute right-4 bg-white border rounded-[10px] w-32 pt-2">
          <li className="pb-2">Editar</li>
          <li className="pb-2">
            <button onClick={() => deleteClass(id)}>Excluir</button>
          </li>
        </ul>
      )}
    </button>
  );
}
