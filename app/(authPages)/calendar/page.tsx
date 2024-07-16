"use client";

import {
  TCalendar,
  createCalendar,
  readCalendars,
} from "@/app/api/calendar/controller";
import { useEffect, useState } from "react";
import CalendarFrame from "./components/CalendarFrame";
import Sidebar from "./components/Sidebar";
import ButtonCalendar from "./components/ButtonCalendar";
import { calendarsAtom } from "@/atoms/calendarAtom";
import { useRecoilState } from "recoil";

export default function Calendar() {
  const [calendars, setCalendars] = useRecoilState(calendarsAtom);
  const [mainCalendar, setMainCalendar] = useState<TCalendar>();
  const [currentCalendar, setCurrentCalendar] = useState<TCalendar>(
    calendars[0]
  );

  useEffect(() => {
    async function handleLoadCalendars() {
      const calendars = await readCalendars();
      let mainCalendar: TCalendar = calendars.filter(
        (cal) => cal.name === "Principal"
      )[0];

      if (calendars.length === 0 || !mainCalendar) {
        mainCalendar = await createCalendar({ name: "Principal", url: "" });
      }

      setCalendars(calendars);
      setMainCalendar(mainCalendar);
      setCurrentCalendar(mainCalendar);
    }
    handleLoadCalendars();
  }, []);

  return (
    <>
      <CalendarFrame src={currentCalendar ? currentCalendar.url : ""} />
      <Sidebar>
        <ButtonCalendar
          key={mainCalendar?.id || ""}
          id={mainCalendar?.id || ""}
          name="Principal"
          calendars={calendars}
          setCalendars={setCalendars}
          onClickName={() => setCurrentCalendar(mainCalendar || calendars[0])}
          currentCalendar={currentCalendar}
          setCurrentCalendar={setCurrentCalendar}
          isPrincipal
        />
        {calendars
          .filter((cal) => cal.name !== "Principal")
          .map((cal) => (
            <ButtonCalendar
              key={cal.id}
              id={cal.id}
              name={cal.name}
              onClickName={() => setCurrentCalendar(cal)}
              calendars={calendars}
              setCalendars={setCalendars}
              currentCalendar={currentCalendar}
              setCurrentCalendar={setCurrentCalendar}
            />
          ))}
      </Sidebar>
    </>
  );
}
