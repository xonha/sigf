import { deleteClass } from "@/app/api/classes/controller";
import { classesAtom } from "@/app/utils/atoms/classesAtom";
import {
  TModalOptions,
  modalIdAtom,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "@/app/utils/atoms/modalAtom";
import { useRecoilState, useSetRecoilState } from "recoil";

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
        onClick={() => {
          deleteClass(props.id);
          setClasses(classes.filter((classItem) => classItem.id !== props.id));
        }}
      >
        Excluir
      </button>
    </div>
  );
}
