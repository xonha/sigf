import { TCalendar } from "@/app/api/calendar/controller";
import { atom } from "recoil";

export const calendarsAtom = atom<TCalendar[] | []>({
  key: "calendarsAtom",
  default: [],
});
