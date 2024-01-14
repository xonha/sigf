import { classDatesAtom } from "@/app/utils/atoms/classDatesAtom";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import CreateClassDateModal, {
  CreateClassDateModalRef,
} from "./CreateClassDateModal";

export default function GenerateClassDates() {
  const createClassDateModalRef = useRef<CreateClassDateModalRef>(null);
  const [classDates, setClassDates] = useRecoilState(classDatesAtom);
  const pathname = usePathname();
  const classId = pathname.split("/")[2];

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
      setClassDates(new_res_data);
    } catch (error) {
      console.error("Error creating class date:", error);
    }
  }

  async function fetchClass() {
    try {
      const res = await fetch(`/api/classes/${classId}`);
      const res_data = await res.json();
      return res_data;
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }

  function getWeekDays(startDate: Date, endDate: Date, weekDays: string[]) {
    const currentDate = new Date(startDate);

    const classDates: Date[] = [];
    while (currentDate <= endDate) {
      if (
        weekDays.includes(
          currentDate
            .toLocaleDateString("en-US", { weekday: "short" })
            .toLowerCase()
        )
      ) {
        classDates.push(new Date(currentDate));
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return classDates;
  }

  async function deleteClassDates() {
    const body = { classId };
    try {
      const res = await fetch(`/api/classDates`, {
        method: "DELETE",
        body: JSON.stringify(body),
      });

      await res.json();
    } catch (error) {
      console.error("Error deleting class date:", error);
    }
    setClassDates([]);
  }

  async function handleCreateAllClassDates() {
    const classData = await fetchClass();

    const weekDays = classData.week_days;
    const startDate = new Date(classData.period.startDate + "EDT");
    const endDate = new Date(classData.period.endDate + "EDT");

    const weekDaysDates = getWeekDays(startDate, endDate, weekDays);
    createClassDates(weekDaysDates);
  }

  function toggleCreateClassDateModal() {
    createClassDateModalRef.current?.toggleModal();
  }

  return (
    <div className="flex gap-4">
      <CreateClassDateModal ref={createClassDateModalRef} />
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={toggleCreateClassDateModal}
      >
        Gerar Uma
      </button>
      {classDates.length === 0 && (
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateAllClassDates}
        >
          Gerar Todas
        </button>
      )}
      <button
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        onClick={deleteClassDates}
      >
        Deletar Todas
      </button>
    </div>
  );
}
