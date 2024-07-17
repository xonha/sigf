import { TCalendar } from "@/app/api/calendar/service";
import { atom } from "recoil";

export const calendarsAtom = atom<TCalendar[] | []>({
  key: "calendarsAtom",
  default: [],
});
