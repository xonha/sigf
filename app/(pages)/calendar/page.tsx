"use client";

import { FaPen } from "react-icons/fa6";
import { TCalendar, readCalendars } from "@/app/api/calendar/controller";
import { useEffect, useState } from "react";
import ButtonNewCalendar from "./components/ButtonNewCalendar";
import CalendarFrame from "./components/CalendarFrame";
import Sidebar from "./components/Sidebar";

export default function Calendar() {
  const [calendars, setCalendars] = useState<TCalendar[]>([]);
  const [currentCalendar, setCurrentCalendar] = useState<TCalendar>(
    calendars[0],
  );

  useEffect(() => {
    async function handleLoadCalendars() {
      const calendars = await readCalendars();
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
          name="Principal"
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
              name={cal.name}
              onClickName={() => setCurrentCalendar(cal)}
            />
          ))}
      </Sidebar>
    </>
  );
}

function ButtonCalendar(props: {
  name: string;
  onClickName: () => void;
  onClickEdit?: () => void;
}) {
  return (
    <div className="flex items-center p-4 gap-4 w-full justify-between">
      <span className="cursor-pointer" onClick={props.onClickName}>
        {props.name}
      </span>
      <FaPen className="cursor-pointer" onClick={props.onClickEdit} />
    </div>
  );
}
