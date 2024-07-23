import { enrollmentsAtom } from "@/atoms/enrollmentsAtom";
import {
  TModalOptions,
  modalIdAtom,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "@/atoms/modalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ButtonEnrollment(props: { id: string }) {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setModalId = useSetRecoilState(modalIdAtom);
  const enrollments = useRecoilValue(enrollmentsAtom);
  const isEnrolled = enrollments.some(
    (enrollment) => enrollment.classId === props.id,
  );

  function openModal(modalOption: TModalOptions) {
    setModalOption(modalOption);
    setModalId(props.id);
    setIsModalOpen(true);
  }

  return (
    <button
      className={
        isEnrolled
          ? "text-green-500 hover:text-green-400 font-bold"
          : "text-blue-500 hover:text-blue-400 font-bold"
      }
      onClick={() => openModal("classEnrollment")}
    >
      {isEnrolled ? "Inscrito" : "Inscrever"}
    </button>
  );
}
