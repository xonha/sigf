"use client";

import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import ModalCalendar from "../app/(pages)/calendar/components/ModalCalendar";
import ModalClassDate from "../app/(pages)/classes/[id]/attendance/components/ModalClassDate";
import ModalClassEnrollment from "../app/(pages)/classes/components/ModalClassEnrollment";
import ModalClasses from "../app/(pages)/classes/components/ModalClasses";
import ModalPeriods from "../app/(pages)/periods/components/ModalPeriods";
import { modalIsOpenAtom, modalOptionsAtom } from "@/atoms/modalAtom";

Modal.setAppElement("#__modal");

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
