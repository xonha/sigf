import { Database } from "@/database.types";
import { TPeriod } from "../api/periods/route";

export async function readPeriod(periodId: string | string[]) {
  try {
    const res = await fetch(`/api/periods/${periodId}`);
    const periodData: TPeriod = await res.json();
    return periodData;
  } catch (error) {
    console.error("Error reading class:", error);
    throw error;
  }
}

export async function readPeriods() {
  try {
    const res = await fetch("/api/periods");
    const periods: TPeriod[] = await res.json();
    return periods;
  } catch (error) {
    console.error("Error fetching periods:", error);
    throw error;
  }
}

export async function createPeriod(
  year: Date,
  semester: Database["public"]["Enums"]["semesterEnum"],
  startDate: Date,
  endDate: Date,
) {
  try {
    const body = {
      year: year.getFullYear(),
      semester,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    await fetch("/api/periods", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const res = await fetch("/api/periods");
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error creating period:", error);
  }
}

export async function editPeriod(
  periodId: string,
  year: Date,
  semester: Database["public"]["Enums"]["semesterEnum"],
  startDate: Date,
  endDate: Date,
) {
  try {
    const body = {
      id: periodId,
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

    return data;
  } catch (error) {
    console.error("Error creating period:", error);
  }
}
