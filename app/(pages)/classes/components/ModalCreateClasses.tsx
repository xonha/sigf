import { classesAtom } from "@/app/utils/atoms/classesAtom";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import MainModal from "../../../components/MainModal";
import { periodsAtom } from "../../../utils/atoms/periodsAtom";
import { validWeekDays } from "../../../utils/types/WeekDays";

export interface ModalCreateClassesRef {
  toggleModal: () => void;
}

export default React.forwardRef<ModalCreateClassesRef>((_, ref) => {
  const setClasses = useSetRecoilState(classesAtom);
  const [periods, setPeriods] = useRecoilState(periodsAtom);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [classSize, setClassSize] = useState(30);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function handleFormSubmit(e) {
    const periodId = e.target[2].value;
    e.preventDefault();
    fetchPeriods();
    createClass(name, periodId, selectedWeekdays, classSize);
    setSelectedWeekdays([]);
  }
  function handleWeekDaysCheckboxChange(weekday) {
    const updatedWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter((day) => day !== weekday)
      : [...selectedWeekdays, weekday];
    setSelectedWeekdays(updatedWeekdays);
  }

  async function fetchPeriods() {
    try {
      const res = await fetch("/api/periods");
      const data = await res.json();
      setPeriods(data);
    } catch (error) {
      console.error("Error fetching periods:", error);
    }
  }

  async function fetchClasses() {
    try {
      const res = await fetch("/api/classes");
      const data = await res.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }

  async function createClass(
    name: string,
    periodId: string,
    weekDays: string[],
    size: number
  ) {
    const week_days = weekDays.join(",");

    try {
      const body = { name, periodId, week_days, size };

      await fetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const res = await fetch("/api/classes");
      const data = await res.json();

      setClasses(data);
      setIsModalOpen(false);
      setName("");
    } catch (error) {
      console.error("Error creating class:", error);
    }
  }

  useEffect(() => {
    fetchPeriods();
    fetchClasses();
  }, []);

  useImperativeHandle(ref, () => ({
    toggleModal,
  }));

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={toggleModal}>
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          onSubmit={handleFormSubmit}
        >
          <label className="text-md" htmlFor="name">
            Nome
          </label>
          <input
            className="border rounded-md px-4 py-2 pl-2"
            type="text"
            placeholder="Avançada 1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-md" htmlFor="name">
            Tamanho da Turma
          </label>
          <input
            className="border rounded-md px-4 py-2 pl-2"
            type="number"
            value={classSize}
            onChange={(e) => setClassSize(Number(e.target.value))}
          />
          <label className="text-md" htmlFor="semester">
            Semestre
          </label>
          <select
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="periodId"
          >
            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.year} - {period.semester}
              </option>
            ))}
          </select>
          <label className="text-md" htmlFor="weekdays">
            Dias da Semana
          </label>
          <div className="flex gap-4">
            {validWeekDays.map((weekday) => (
              <div key={weekday} className="flex items-center">
                <input
                  type="checkbox"
                  id={weekday}
                  name="weekdays"
                  value={weekday}
                  checked={selectedWeekdays.includes(weekday)}
                  onChange={() => handleWeekDaysCheckboxChange(weekday)}
                />
                <label className="ml-2" htmlFor={weekday}>
                  {weekday}
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button
              className="border border-gray-700 rounded px-4 py-2 text-black"
              onClick={() => setIsModalOpen(false)}
            >
              Fechar
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Criar
            </button>
          </div>
        </form>
      </MainModal>
    </>
  );
});
