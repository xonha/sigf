import { classesAtom } from "@/app/utils/atoms/classesAtom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { periodsAtom } from "../../../utils/atoms/periodsAtom";
import { validWeekDays } from "../../../utils/types/WeekDays";

interface ModalCreateClassesProps {
  setIsModalOpen: (value: boolean) => void;
}

async function createClass(
  name: string,
  periodId: string,
  weekDays: string[],
  size: number
) {
  const week_days = weekDays.join(",");
  const body = { name, periodId, week_days, size };

  const resCreateClass = await fetch("/api/classes", {
    method: "POST",
    body: JSON.stringify(body),
  });
  if (!resCreateClass.ok) {
    throw new Error("Error creating class");
  }

  const res = await fetch("/api/classes");
  if (!res.ok) {
    throw new Error("Error fetching classes");
  }

  const data = await res.json();

  return data;
}

export default function ModalCreateClasses(props: ModalCreateClassesProps) {
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [classSize, setClassSize] = useState(30);
  const [name, setName] = useState("");
  const periods = useRecoilValue(periodsAtom);
  const setClasses = useSetRecoilState(classesAtom);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const periodId = event.target[2].value;
    event.preventDefault();
    const classData = await createClass(
      name,
      periodId,
      selectedWeekdays,
      classSize
    );
    setClasses(classData);
    props.setIsModalOpen(false);
    setName("");

    setSelectedWeekdays([]);
  }

  function handleWeekDaysCheckboxChange(weekday) {
    const updatedWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter((day) => day !== weekday)
      : [...selectedWeekdays, weekday];
    setSelectedWeekdays(updatedWeekdays);
  }

  return (
    <>
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
            onClick={() => props.setIsModalOpen(false)}
          >
            Fechar
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Criar
          </button>
        </div>
      </form>
    </>
  );
}
