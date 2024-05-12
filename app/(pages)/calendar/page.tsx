"use client";

import {
  TCalendar,
  createCalendar,
  readCalendars,
} from "@/app/api/calendar/controller";
import { useEffect, useState } from "react";
import ButtonNewCalendar from "./components/ButtonNewCalendar";
import CalendarFrame from "./components/CalendarFrame";
import Sidebar from "./components/Sidebar";
import ButtonCalendar from "./components/ButtonCalendar";

export default function Calendar() {
  const [calendars, setCalendars] = useState<TCalendar[]>([]);
  const [currentCalendar, setCurrentCalendar] = useState<TCalendar>(
    calendars[0],
  );

  useEffect(() => {
    async function handleLoadCalendars() {
      const calendars = await readCalendars();

      if (
        !calendars.length ||
        !calendars.filter((cal) => cal.name === "main")
      ) {
        createCalendar({ name: "main", url: "" });
      }
      setCalendars(calendars);
      setCurrentCalendar(calendars[0]);
    }
    handleLoadCalendars();
  }, []);

  return (
    <>
      <CalendarFrame src={currentCalendar ? currentCalendar.url : ""} />
      <Sidebar>
        <ButtonNewCalendar calendars={calendars} setCalendars={setCalendars} />
        <ButtonCalendar
          key="main"
          id="main"
          name="Principal"
          calendars={calendars}
          setCalendars={setCalendars}
          onClickName={() =>
            setCurrentCalendar(
              calendars.filter((cal) => cal.name === "main")[0],
            )
          }
        />
        {calendars
          .filter((cal) => cal.name !== "main")
          .map((cal) => (
            <ButtonCalendar
              key={cal.id}
              id={cal.id}
              name={cal.name}
              onClickName={() => setCurrentCalendar(cal)}
              calendars={calendars}
              setCalendars={setCalendars}
            />
          ))}
      </Sidebar>
    </>
  );
}
