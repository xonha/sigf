import { classesAtom } from "@/app/utils/atoms/classesAtom";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import ModalEditClasses, { ModalEditClassesRef } from "./ModalEditClasses";

export default function ButtonOptions(props: { id: string }) {
  const { id } = props;
  const [classes, setClasses] = useRecoilState(classesAtom);
  const modalRef = useRef<ModalEditClassesRef>(null);

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
      <ModalEditClasses id={id} ref={modalRef} />
      <div className="flex gap-2">
        <button
          className="text-blue-500 hover:text-blue-400 font-bold"
          onClick={toggleModal}
        >
          Editar
        </button>
        <button
          className="text-red-500 hover:text-red-400 font-bold"
          onClick={() => deleteClass(id)}
        >
          Excluir
        </button>
      </div>
    </>
  );
}
