import React, { useImperativeHandle, useState } from "react";
import Modal from "react-modal";
import ModalCreateClasses from "../(pages)/classes/components/ModalCreateClasses";

Modal.setAppElement("#__modal");

export interface MainModalRef {
  openModal: () => void;
}

export default React.forwardRef<MainModalRef>((_, ref) => {
  const customStyles = {
    content: {
      width: "fit-content",
      height: "fit-content",
      margin: "auto",
      overflow: "visible",
    },
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsModalOpen(true),
  }));

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      contentLabel="Example Modal Menu"
      style={customStyles}
    >
      <ModalCreateClasses setIsModalOpen={setIsModalOpen} />
    </Modal>
  );
});
