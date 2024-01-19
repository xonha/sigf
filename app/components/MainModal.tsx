import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import ModalClasses from "../(pages)/classes/components/ModalClasses";
import ModalPeriods from "../(pages)/periods/components/ModalPeriods";
import { modalIsOpenAtom, modalOptionsAtom } from "../utils/atoms/modalAtom";

Modal.setAppElement("#__modal");

export interface MainModalProps {
  setIsModalOpen: (value: boolean) => void;
}

export default function MainModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalIsOpenAtom);
  const modalOption = useRecoilValue(modalOptionsAtom);
  const customStyles = {
    content: {
      width: "fit-content",
      height: "fit-content",
      margin: "auto",
      overflow: "visible",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      style={customStyles}
    >
      {
        {
          classes: <ModalClasses />,
          periods: <ModalPeriods />,
        }[modalOption]
      }
    </Modal>
  );
}
