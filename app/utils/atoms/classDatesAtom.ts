import { Database } from "@/database.types";
import { atom } from "recoil";

type TClassDatesRow = Database["public"]["Tables"]["classDates"]["Row"];

export const classDatesAtom = atom<TClassDatesRow[] | []>({
  key: "classDatesAtom",
  default: [],
});
