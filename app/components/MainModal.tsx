"use client";

import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import ModalCalendar from "../(authPages)/calendar/components/ModalCalendar";
import ModalClassDate from "../(authPages)/classes/[id]/attendance/components/ModalClassDate";
import ModalClassEnrollment from "../(authPages)/classes/components/ModalClassEnrollment";
import ModalClasses from "../(authPages)/classes/components/ModalClasses";
import ModalPeriods from "../(authPages)/periods/components/ModalPeriods";
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
