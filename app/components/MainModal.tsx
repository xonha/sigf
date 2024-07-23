"use client";

import {
  TModalOptions,
  modalIdAtom,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "@/atoms/modalAtom";
import Modal from "react-modal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ModalCalendar from "../(authPages)/calendar/components/ModalCalendar";
import ModalClassDate from "../(authPages)/classes/[id]/attendance/components/ModalClassDate";
import ModalClassEnrollment from "../(authPages)/classes/components/ModalClassEnrollment";
import ModalClasses from "../(authPages)/classes/components/ModalClasses";
import ModalPeriods from "../(authPages)/periods/components/ModalPeriods";

Modal.setAppElement("#__modal");

export function useModal() {
  const setModalOption = useSetRecoilState(modalOptionsAtom);
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setPeriodId = useSetRecoilState(modalIdAtom);

  function openModal(modalOption: TModalOptions, id: string = "") {
    setIsModalOpen(true);
    setModalOption(modalOption);
    setPeriodId(id);
  }
  return openModal;
}
export default function MainModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalIsOpenAtom);
  const modalOption = useRecoilValue(modalOptionsAtom);

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={{
        content: {
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
          overflow: "visible",
        },
      }}
    >
      {
        {
          classes: <ModalClasses />,
          periods: <ModalPeriods />,
          calendar: <ModalCalendar />,
          classDate: <ModalClassDate />,
          classEnrollment: <ModalClassEnrollment />,
        }[modalOption]
      }
    </Modal>
  );
}
