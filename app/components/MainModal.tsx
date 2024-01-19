import Modal from "react-modal";
import { useRecoilState, useRecoilValue } from "recoil";
import FormClassDate from "../(pages)/classes/[id]/attendance/components/FormClassDate";
import FormClasses from "../(pages)/classes/components/FormClasses";
import FormPeriods from "../(pages)/periods/components/FormPeriods";
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
          classes: <FormClasses />,
          periods: <FormPeriods />,
          classDate: <FormClassDate />,
        }[modalOption]
      }
    </Modal>
  );
}
