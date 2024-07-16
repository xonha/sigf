"use client";

import {
  createPeriod,
  editPeriod,
  readPeriod,
} from "@/app/api/periods/controller";
import { modalIsOpenAtom, modalIdAtom } from "@/atoms/modalAtom";
import { periodsAtom } from "@/atoms/periodsAtom";
import { Database } from "@/database.types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function ModalPeriods() {
  const setPeriods = useSetRecoilState(periodsAtom);
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const periodId = useRecoilValue(modalIdAtom);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [year, setYear] = useState(new Date());
  const [semester, setSemester] =
    useState<Database["public"]["Enums"]["semesterEnum"]>("first");

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let periodData;
    if (!periodId) {
      periodData = await createPeriod(year, semester, startDate, endDate);
    } else {
      periodData = await editPeriod(
        periodId,
        year,
        semester,
        startDate,
        endDate,
      );
    }

    setPeriods(periodData);
    setIsModalOpen(false);
  }

  if (periodId) {
    useEffect(() => {
      async function readCurrentSelectedPeriod() {
        const periodData = await readPeriod(periodId);
        setSemester(periodData.semester);
        setYear(new Date(periodData.year.toString() + "EDT"));
        setStartDate(new Date(periodData.startDate + "EDT"));
        setEndDate(new Date(periodData.endDate + "EDT"));
      }
      readCurrentSelectedPeriod();
    }, []);
  }

  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action="/api/periods"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="text-md" htmlFor="semester">
        Semestre
      </label>
      <select
        className="rounded-md px-4 py-2 bg-inherit border mb-2"
        value={semester}
        onChange={(e) => {
          setSemester(
            e.target.value as Database["public"]["Enums"]["semesterEnum"],
          );
        }}
        required
      >
        <option value="first">Primeiro</option>
        <option value="firstVacation">Primeiro/Férias</option>
        <option value="second">Segundo</option>
        <option value="secondVacation">Segundo/Férias</option>
      </select>
      <label className="text-md" htmlFor="year">
        Ano
      </label>
      <DatePicker
        className="rounded-md px-4 py-2 bg-inherit border mb-2"
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
        className="rounded-md px-4 py-2 bg-inherit border mb-2"
        selected={startDate}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
          setStartDate(date || new Date());
        }}
      />
      <label className="text-md" htmlFor="endDate">
        Data de Término
      </label>
      <DatePicker
        className="rounded-md px-4 py-2 bg-inherit border mb-2"
        selected={endDate}
        dateFormat="dd/MM/yyyy"
        onChange={(date) => {
          setEndDate(date || new Date());
        }}
      />
      <div className="flex flex-row-reverse gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          {periodId ? "Salvar" : "Criar"}
        </button>
        <button
          className="border border-gray-700 rounded px-4 py-2 text-black"
          onClick={() => setIsModalOpen(false)}
        >
          Fechar
        </button>
      </div>
    </form>
  );
}
