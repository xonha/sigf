"use client";

import {
  createClass,
  readClass,
  updateClass,
} from "@/app/api/classes/controller";
import { classesAtom } from "@/app/utils/atoms/classesAtom";
import { modalIdAtom, modalIsOpenAtom } from "@/app/utils/atoms/modalAtom";
import { periodsAtom } from "@/app/utils/atoms/periodsAtom";
import { validWeekDays } from "@/app/utils/types/WeekDays";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ModalClasses() {
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [size, setSize] = useState(30);
  const [name, setName] = useState("");
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setClasses = useSetRecoilState(classesAtom);
  const classId = useRecoilValue(modalIdAtom);
  const periods = useRecoilValue(periodsAtom);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    const periodId = event.target[2].value;
    event.preventDefault();

    let classData: any;
    if (!classId) {
      classData = await createClass({
        name,
        periodId,
        weekDays: selectedWeekdays.join(","),
        size,
        isActive,
      });
    } else {
      classData = await updateClass({
        id: classId,
        name,
        weekDays: selectedWeekdays.join(","),
        size,
        isActive,
      });
    }
    setName("");
    setClasses(classData);
    setSelectedWeekdays([]);
    setIsModalOpen(false);
  }

  function handleWeekDaysCheckboxChange(weekday: string) {
    const updatedWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter((day) => day !== weekday)
      : [...selectedWeekdays, weekday];
    setSelectedWeekdays(updatedWeekdays);
  }

  if (classId) {
    useEffect(() => {
      async function updateClassState() {
        const classData = await readClass(classId);
        const currentSelectedWeekdays = classData.weekDays.split(",");
        setSelectedWeekdays(currentSelectedWeekdays);
        classData.size !== undefined ? setSize(classData.size) : setSize(30);
        classData.isActive !== undefined
          ? setIsActive(classData.isActive)
          : setIsActive(false);
        setName(classData.name);
      }
      updateClassState();
    }, []);
  }

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      onSubmit={handleFormSubmit}
    >
      <label className="text-md">Nome</label>
      <input
        className="border rounded-md px-4 py-2 pl-2"
        type="text"
        placeholder="Avançada 1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="text-md">Tamanho da Turma</label>
      <input
        className="border rounded-md px-4 py-2 pl-2"
        type="number"
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
      />
      <label className="text-md">Semestre</label>
      <select
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="periodId"
      >
        {periods.map((period: any) => (
          <option key={period.id} value={period.id}>
            {period.year} - {period.semester}
          </option>
        ))}
      </select>
      <div className="flex gap-4">
        <label>Classe Ativa</label>
        <input
          name="status"
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
      </div>
      <label className="text-md">Dias da Semana</label>
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
            <label className="ml-2">{weekday}</label>
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
  );
}
