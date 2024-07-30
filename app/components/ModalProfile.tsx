import { modalFunctionAtom, modalIsOpenAtom } from "@/atoms/modalAtom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import tw from "tailwind-styled-components";

export function ModalProfile() {
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const modalFunction = useRecoilValue(modalFunctionAtom);
  const [chageOption, setChageOption] = useState<
    "profile" | "email" | "password"
  >("profile");

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      {chageOption === "profile" && (
        <>
          <Label>Nome</Label>
          <Input placeholder="João Pedro" />
          <Label>Foto de perfil</Label>
          <Input placeholder="Link da imagem" />
        </>
      )}
      {chageOption === "password" && (
        <>
          <Label>Senha nova</Label>
          <Input placeholder="Senha nova" />
          <Label>Confirmar senha nova</Label>
          <Input placeholder="Senha nova" />
        </>
      )}
      {chageOption === "email" && (
        <>
          <Label>Email</Label>
          <Input placeholder="joao.pedro@email.com" />
          <Label>Confirmar email</Label>
          <Input placeholder="joao.pedro@email.com" />
        </>
      )}
      <Label>Senha</Label>
      <Input placeholder="Senha atual" />

      <ButtonOptionsRow>
        {chageOption !== "profile" && (
          <ChangeButton onClick={() => setChageOption("profile")}>
            Mudar perfil
          </ChangeButton>
        )}
        {chageOption !== "password" && (
          <ChangeButton onClick={() => setChageOption("password")}>
            Mudar senha
          </ChangeButton>
        )}
        {chageOption !== "email" && (
          <ChangeButton onClick={() => setChageOption("email")}>
            Mudar email
          </ChangeButton>
        )}
      </ButtonOptionsRow>

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
          Salvar
        </ConfirmButton>
      </ButtonRow>
    </Form>
  );
}

const Input = tw.input`border rounded-md px-4 py-2 pl-2`;
const Label = tw.label`text-md`;
const Form = tw.form`flex-1 flex flex-col w-full justify-center gap-2 text-foreground`;
const ButtonRow = tw.div`flex gap-4 justify-end pt-4`;
const ButtonOptionsRow = tw.div`flex gap-4 justify-between pt-4`;
const ChangeButton = tw.button`text-blue-500 hover:text-blue-600 font-bold`;
const ConfirmButton = tw.button`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded`;
const CancelButton = tw.button`border border-gray-700 rounded px-4 py-2 text-black`;
