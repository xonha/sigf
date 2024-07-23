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
    calendars[0],
  );

  const handleLoadCalendars = async () => {
    const calendars = await readCalendars();
    let mainCalendar: TCalendar | undefined = calendars.find(
      (cal) => cal.name === "Principal",
    );

    if (calendars.length === 0 || !mainCalendar) {
      mainCalendar = await createCalendar({ name: "Principal", url: "" });
    }

    setCalendars(calendars);
    setMainCalendar(mainCalendar);
    setCurrentCalendar(mainCalendar);
  };

  useEffect(() => {
    handleLoadCalendars();
  }, []);

  return (
    <>
      <CalendarFrame src={currentCalendar?.url || ""} />
      <Sidebar>
        <ButtonCalendar
          key={mainCalendar?.id || ""}
          {...{
            id: mainCalendar?.id || "",
            name: "Principal",
            calendars,
            setCalendars,
            onClickName: () => setCurrentCalendar(mainCalendar || calendars[0]),
            currentCalendar,
            setCurrentCalendar,
            isPrincipal: true,
          }}
        />
        {calendars
          .filter((cal) => cal.name !== "Principal")
          .map((cal) => (
            <ButtonCalendar
              key={cal.id}
              {...{
                id: cal.id,
                name: cal.name,
                onClickName: () => setCurrentCalendar(cal),
                calendars,
                setCalendars,
                currentCalendar,
                setCurrentCalendar,
              }}
            />
          ))}
      </Sidebar>
    </>
  );
}
