import { IClassDatesRow } from "@/app/(pages)/classes/[id]/attendance/page";
import { atom } from "recoil";

export const classDatesAtom = atom<IClassDatesRow[] | []>({
  key: "classDatesAtom",
  default: [],
});
