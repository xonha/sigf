import { useState, useEffect, useRef } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function ClassesOptionsButton() {
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

  return (
    <button ref={buttonRef} onClick={toggleOptionsMenu}>
      <FaEllipsisVertical />
      {isOptionsMenuVisible && (
        <ul className="absolute right-4 bg-white border rounded-[10px] w-32 pt-2">
          <li className="pb-2">Editar</li>
          <li className="pb-2">Excluir</li>
        </ul>
      )}
    </button>
  );
}
