import { atom } from "recoil";
import { TCalendar } from "../api/calendar/controller";

export const calendarsAtom = atom<TCalendar[] | []>({
  key: "calendarsAtom",
  default: [],
});
