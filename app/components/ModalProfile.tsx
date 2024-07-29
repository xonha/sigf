import { modalFunctionAtom, modalIsOpenAtom } from "@/atoms/modalAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";

export function ModalProfile() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const modalFunction = useRecoilValue(modalFunctionAtom);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <h2 className="text-lg flex justify-center pb-4">Confirmar exclusão?</h2>

      <ButtonContainer>
        <ButtonRow>
          <CancelButton onClick={() => setIsModalOpen(false)}>
            Cancelar
          </CancelButton>
          <ConfirmButton
            onClick={() => {
              modalFunction();
              setIsModalOpen(false);
            }}
          >
            Confirmar
          </ConfirmButton>
        </ButtonRow>
      </ButtonContainer>
    </Form>
  );
}

const Form = tw.form`flex-1 flex flex-col w-full justify-center gap-2 text-foreground`;
const ButtonContainer = tw.div`flex flex-col gap-4`;
const ButtonRow = tw.div`flex gap-4`;
const ConfirmButton = tw.button`bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded`;
const CancelButton = tw.button`border border-gray-700 rounded px-4 py-2 text-black`;
