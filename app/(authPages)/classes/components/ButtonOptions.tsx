import { deleteClass } from "@/app/api/classes/service";
import { classesAtom } from "@/atoms/classesAtom";
import {
  modalIsOpenAtom,
  modalOptionsAtom,
  modalIdAtom,
  TModalOptions,
} from "@/atoms/modalAtom";
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
        className="text-orange-500 hover:text-orange-400 font-bold"
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
