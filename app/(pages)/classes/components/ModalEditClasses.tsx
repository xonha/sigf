import MainModal from "@/app/components/MainModal";
import { readClass } from "@/app/controllers/Classes";
import { classesAtom } from "@/app/utils/atoms/classesAtom";
import { validWeekDays } from "@/app/utils/types/WeekDays";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { useSetRecoilState } from "recoil";

export interface ModalEditClassesRef {
  toggleModal: () => void;
}

interface Props {
  id: string;
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

export default React.forwardRef<ModalEditClassesRef, Props>((props, ref) => {
  const classId = props.id;
  const setClasses = useSetRecoilState(classesAtom);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [name, setName] = useState("");
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useImperativeHandle(ref, () => ({
    id: props.id,
    toggleModal,
  }));

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newClasses = await editClass(classId, name, selectedWeekdays);

    setClasses(newClasses);
    setIsModalOpen(false);
  }

  function handleWeekDaysCheckboxChange(weekday) {
    const updatedWeekdays = selectedWeekdays.includes(weekday)
      ? selectedWeekdays.filter((day) => day !== weekday)
      : [...selectedWeekdays, weekday];
    setSelectedWeekdays(updatedWeekdays);
  }

  useEffect(() => {
    async function readCurrentSelectedWeekdays() {
      const classData = await readClass(classId);
      const currentSelectedWeekdays = classData.week_days.split(",");
      setSelectedWeekdays(currentSelectedWeekdays);
      setName(classData.name);
    }
    readCurrentSelectedWeekdays();
  }, []);

  return (
    <>
      <MainModal isOpen={isModalOpen} onRequestClose={toggleModal}>
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
              Salvar
            </button>
          </div>
        </form>
      </MainModal>
    </>
  );
});
