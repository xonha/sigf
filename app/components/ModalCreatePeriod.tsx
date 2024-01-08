import { Database } from "@/database.types";
import React, { useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import { useSetRecoilState } from "recoil";
import { periodsAtom } from "../utils/atoms/periodsAtom";
import MainModal from "./MainModal";

export interface ModalCreatePeriodRef {
  toggleModal: () => void;
}

export default React.forwardRef<ModalCreatePeriodRef>((_, ref) => {
  const setPeriods = useSetRecoilState(periodsAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [semester, setSemester] =
    useState<Database["public"]["Enums"]["semesterEnum"]>("first");

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  async function createPeriod(
    year: Date,
    semester: Database["public"]["Enums"]["semesterEnum"],
    startDate: Date,
    endDate: Date
  ) {
    try {
      const body = {
        year: year.getFullYear(),
        semester,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      await fetch("/api/periods", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const res = await fetch("/api/periods");
      const data = await res.json();

      setPeriods(data);
    } catch (error) {
      console.error("Error creating period:", error);
    }
  }

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={toggleModal}>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/api/periods"
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            createPeriod(year, semester, startDate, endDate);
            setIsModalOpen(false);
          }}
        >
          <label className="text-md" htmlFor="semester">
            Semestre
          </label>
          <select
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            value={semester}
            onChange={(e) => {
              setSemester(
                e.target.value as Database["public"]["Enums"]["semesterEnum"]
              );
            }}
            required
          >
            <option value="first">Primeiro</option>
            <option value="second">Segundo</option>
            <option value="firstVacation">Primeiro Férias</option>
            <option value="secondVacation">Segundo Férias</option>
          </select>
          <label className="text-md" htmlFor="year">
            Ano
          </label>
          <DatePicker
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            selected={year}
            onChange={(date) => {
              setYear(date || new Date());
            }}
            showYearPicker
            dateFormat="yyyy"
          />
          <label className="text-md" htmlFor="startDate">
            Data de Início
          </label>
          <DatePicker
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            selected={startDate}
            onChange={(date) => {
              setStartDate(date || new Date());
            }}
          />
          <label className="text-md" htmlFor="endDate">
            Data de Término
          </label>
          <DatePicker
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            selected={endDate}
            onChange={(date) => {
              setEndDate(date || new Date());
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
