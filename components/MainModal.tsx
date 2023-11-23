import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#__modal");

interface MainModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

export default function MainModal({
  isOpen,
  onRequestClose,
  children,
}: MainModalProps): React.ReactElement {
  const customStyles = {
    content: {
      width: "fit-content",
      height: "fit-content",
      margin: "auto",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Example Modal Menu"
      style={customStyles}
    >
      {children}
    </Modal>
  );
}
