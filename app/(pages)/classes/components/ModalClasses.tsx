"use client";

import { readClass } from "@/app/controllers/Classes";
import { classesAtom } from "@/app/utils/atoms/classesAtom";
import { modalIdAtom, modalIsOpenAtom } from "@/app/utils/atoms/modalAtom";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { periodsAtom } from "../../../utils/atoms/periodsAtom";
import { validWeekDays } from "../../../utils/types/WeekDays";

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

async function editClass(id: string, className: string, weekDays: string[]) {
  try {
    const body = { id, name: className, week_days: weekDays.join(",") };

    await fetch(`/api/classes`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });

    const response = await fetch("/api/classes");
    const newClasses = await response.json();

    return newClasses;
  } catch (error) {
    console.error("Error creating class:", error);
    throw error;
  }
}

export default function ModalClasses() {
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [classSize, setClassSize] = useState(30);
  const [name, setName] = useState("");
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setClasses = useSetRecoilState(classesAtom);
  const classId = useRecoilValue(modalIdAtom);
  const periods = useRecoilValue(periodsAtom);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const periodId = event.target[2].value;
    event.preventDefault();

    let classData;
    if (!classId) {
      classData = await createClass(
        name,
        periodId,
        selectedWeekdays,
        classSize
      );
    } else {
      classData = await editClass(classId, name, selectedWeekdays);
    }
    setName("");
    setClasses(classData);
    setSelectedWeekdays([]);
    setIsModalOpen(false);
  }

  function handleWeekDaysCheckboxChange(weekday) {
    const updatedWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter((day) => day !== weekday)
      : [...selectedWeekdays, weekday];
    setSelectedWeekdays(updatedWeekdays);
  }

  if (classId) {
    useEffect(() => {
      async function readCurrentSelectedWeekdays() {
        const classData = await readClass(classId);
        const currentSelectedWeekdays = classData.week_days.split(",");
        setSelectedWeekdays(currentSelectedWeekdays);
        setName(classData.name);
      }
      readCurrentSelectedWeekdays();
    }, []);
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
            onClick={() => setIsModalOpen(false)}
          >
            Fechar
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            {classId ? "Salvar" : "Criar"}
          </button>
        </div>
      </form>
    </>
  );
}
