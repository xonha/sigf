"use client";

import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import FormClassDate from "../(pages)/classes/[id]/attendance/components/FormClassDate";
import ModalClassEnrollment from "../(pages)/classes/components/ModalClassEnrollment";
import ModalClasses from "../(pages)/classes/components/ModalClasses";
import FormPeriods from "../(pages)/periods/components/FormPeriods";
import { modalIsOpenAtom, modalOptionsAtom } from "../utils/atoms/modalAtom";

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
          periods: <FormPeriods />,
          classDate: <FormClassDate />,
          classEnrollment: <ModalClassEnrollment />,
        }[modalOption]
      }
    </Modal>
  );
}
