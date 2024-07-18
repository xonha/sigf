import axios from "axios";
import { TClassDates } from "./route";

export async function readClassDates(classId: string | string[]) {
  try {
    const res = await axios.get(`/api/classDates/${classId}`);
    return res.data as TClassDates[];
  } catch (error) {
    console.error("Error fetching class dates:", error);
    throw error;
  }
}

export async function createClassDates(
  classId: string | string[],
  dates: Date[],
  currentClassDates: TClassDates[] = [],
): Promise<TClassDates[]> {
  const body = dates.map((date) => {
    return {
      date: date.toISOString(),
      classId,
    };
  });

  try {
    const res = await fetch("/api/classDates", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const createdClassDates: TClassDates[] = await res.json();

    const newCreatedClassDates = createdClassDates.map((row) => {
      const date = new Date(row.date + "EDT");
      const day = date.toLocaleDateString("pt-BR", { weekday: "long" });
      return { ...row, day };
    });

    const newClassDates = [...currentClassDates, ...newCreatedClassDates];

    return newClassDates;
  } catch (error) {
    console.error("Error creating class date:", error);
    throw error;
  }
}

export async function deleteClassDates(classId: string | string[]) {
  const body = { classId };
  try {
    const res = await fetch(`/api/classDates`, {
      method: "DELETE",
      body: JSON.stringify(body),
    });
    const deletedClassDates: TClassDates[] = await res.json();
    return deletedClassDates;
  } catch (error) {
    console.error("Error deleting class date:", error);
  }
}
