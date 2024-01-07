import MainModal from "@/app/components/MainModal";
import { periodsAtom } from "@/app/utils/atoms/periodsAtom";
import { Database } from "@/database.types";
import React, { useImperativeHandle, useState } from "react";
import DatePicker from "react-datepicker";
import { useSetRecoilState } from "recoil";

export interface ModalEditPeriodRef {
  toggleModal: () => void;
}

export interface ModalEditPeriodProps {
  data: Database["public"]["Tables"]["period"]["Row"];
}

export default React.forwardRef<ModalEditPeriodRef, ModalEditPeriodProps>(
  (props, ref) => {
    const setPeriods = useSetRecoilState(periodsAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const [startDate, setStartDate] = useState(
      new Date(props.data.startDate + "EDT")
    );
    const [endDate, setEndDate] = useState(
      new Date(props.data.endDate + "EDT")
    );
    const [year, setYear] = useState(
      new Date(Number(props.data.year + 1).toString())
    );
    const [semester, setSemester] = useState<
      Database["public"]["Enums"]["semesterEnum"]
    >(props.data.semester);

    useImperativeHandle(ref, () => ({
      toggleModal,
    }));

    async function editPeriod(
      year: Date,
      semester: Database["public"]["Enums"]["semesterEnum"],
      startDate: Date,
      endDate: Date
    ) {
      try {
        const body = {
          id: props.data.id,
          year: year.getFullYear(),
          semester,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        };

        await fetch("/api/periods", {
          method: "PATCH",
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
            onSubmit={(e) => {
              e.preventDefault();
              editPeriod(year, semester, startDate, endDate);
              setIsModalOpen(false);
            }}
          >
            <h1>{semester}</h1>
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
            <label className="text-md" htmlFor="semester">
              Semestre2113
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
                Editar
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
  }
);
