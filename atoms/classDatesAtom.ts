import { Database } from "@/database.types";
import { atom } from "recoil";

type TClassDates = Database["public"]["Tables"]["classDates"]["Insert"];

export const classDatesAtom = atom<TClassDates[] | []>({
  key: "classDatesAtom",
  default: [],
});
