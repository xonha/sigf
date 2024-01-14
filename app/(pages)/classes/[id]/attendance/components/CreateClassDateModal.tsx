import MainModal from "@/app/components/MainModal";
import { classDatesAtom } from "@/app/utils/atoms/classDatesAtom";
import { usePathname } from "next/navigation";
import React, { useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import { useRecoilState } from "recoil";

export interface CreateClassDateModalRef {
  toggleModal: () => void;
}

export default React.forwardRef<CreateClassDateModalRef>((_, ref) => {
  const pathname = usePathname();
  const classId = pathname.split("/")[2];
  const [classDates, setClassDates] = useRecoilState(classDatesAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  async function createClassDates(dates: Date[]) {
    const body = dates.map((date) => {
      return {
        date: date.toISOString(),
        classId: classId,
      };
    });

    try {
      const res = await fetch("/api/classDates", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const res_data = await res.json();
      const new_res_data = res_data.map((row) => {
        const date = new Date(row.date);
        const day = date.toLocaleDateString("pt-BR", { weekday: "long" });
        return { ...row, day };
      });

      const newClassDates = [...classDates, ...new_res_data];

      setClassDates(newClassDates);
    } catch (error) {
      console.error("Error creating class date:", error);
    }
  }

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={toggleModal}>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/api/periods"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            createClassDates([startDate]);
            setIsModalOpen(false);
          }}
        >
          <label className="text-md" htmlFor="startDate">
            Data da aula
          </label>
          <DatePicker
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date || new Date());
            }}
          />
          <div className="flex flex-row-reverse gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Criar
            </button>
            <button
              className="border border-gray-700 rounded px-4 py-2 text-black"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </button>
          </div>
        </form>
      </MainModal>
    </>
  );
});
