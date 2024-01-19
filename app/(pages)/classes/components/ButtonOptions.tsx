import { classesAtom } from "@/app/utils/atoms/classesAtom";
import {
  TModalOptions,
  modalIdAtom,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "@/app/utils/atoms/modalAtom";
import { useRecoilState, useSetRecoilState } from "recoil";

async function deleteClass(id: string) {
  try {
    const res = await fetch(`/api/classes/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
}

export default function ButtonOptions(props: { id: string }) {
  const [classes, setClasses] = useRecoilState(classesAtom);
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setModalId = useSetRecoilState(modalIdAtom);

  function openModal(modalOption: TModalOptions) {
    setModalOption(modalOption);
    setModalId(props.id);
    setIsModalOpen(true);
  }

  function handleDeleteClass() {
    deleteClass(props.id);
    const newClasses = classes.filter((classItem) => classItem.id !== props.id);
    setClasses(newClasses);
  }

  return (
    <div className="flex gap-2">
      <button
        className="text-blue-500 hover:text-blue-400 font-bold"
        onClick={() => openModal("classes")}
      >
        Editar
      </button>
      <button
        className="text-red-500 hover:text-red-400 font-bold"
        onClick={handleDeleteClass}
      >
        Excluir
      </button>
    </div>
  );
}
