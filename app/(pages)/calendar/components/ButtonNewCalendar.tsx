import {
  modalIsOpenAtom,
  modalOptionsAtom,
  modalIdAtom,
  TModalOptions,
} from "@/atoms/modalAtom";
import { useSetRecoilState } from "recoil";

export default function ButtonNewCalendar() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setModalId = useSetRecoilState(modalIdAtom);

  function openModal(modalOption: TModalOptions) {
    setModalOption(modalOption);
    setModalId("");
    setIsModalOpen(true);
  }

  return (
    <div className="flex justify-center">
      <button
        className="m-4 py-2 px-4 w-full font-bold rounded-md bg-green-500 hover:bg-green-600 text-white"
        onClick={() => openModal("calendar")}
      >
        Criar Calendário
      </button>
    </div>
  );
}
