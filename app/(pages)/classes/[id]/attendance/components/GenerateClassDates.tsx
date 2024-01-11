import { usePathname } from "next/navigation";

export default function GenerateClassDates() {
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

      const data = await res.json();
      console.log(data);
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

      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error deleting class date:", error);
    }
  }

  async function handleOnClickCreate() {
    const classData = await fetchClass();

    const weekDays = classData.week_days;
    const startDate = new Date(classData.period.startDate + "EDT");
    const endDate = new Date(classData.period.endDate + "EDT");

    const weekDaysDates = getWeekDays(startDate, endDate, weekDays);
    const createdClassDates = await createClassDates(weekDaysDates);
    console.log(createdClassDates);
  }

  async function handleOnClickCreateOne() {
    console.log("Create one");
  }

  return (
    <div className="flex gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={handleOnClickCreateOne}
      >
        Gerar Uma
      </button>
      <button
        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
        onClick={handleOnClickCreate}
      >
        Gerar Todas
      </button>
      <button
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        onClick={deleteClassDates}
      >
        Deletar Todas
      </button>
    </div>
  );
}
