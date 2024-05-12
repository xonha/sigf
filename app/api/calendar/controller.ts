import { Database } from "@/database.types";

export type TCalendar = Database["public"]["Tables"]["calendar"]["Row"];
export type TCalendarInsert =
  Database["public"]["Tables"]["calendar"]["Insert"];
export type TCalendarUpdate =
  Database["public"]["Tables"]["calendar"]["Update"];

export async function readCalendars(): Promise<TCalendar[]> {
  try {
    const res = await fetch(`/api/calendar`);

    const calendars = await res.json();
    return calendars;
  } catch (error) {
    console.error("Error reading calendars:", error);
    throw error;
  }
}

export async function createCalendar(
  body: TCalendarInsert,
): Promise<TCalendar> {
  try {
    const res = await fetch(`/api/calendar`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const createdCalendar: TCalendar = await res.json();
    return createdCalendar[0];
  } catch (error) {
    console.error("Error creating calendar:", error);
    throw error;
  }
}

export async function updateCalendar(
  body: TCalendarUpdate,
): Promise<TCalendar> {
  try {
    const res = await fetch(`/api/calendar`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    const updatedCalendar: TCalendar = await res.json();

    return updatedCalendar[0];
  } catch (error) {
    console.error("Error updating calendar:", error);
    throw error;
  }
}
