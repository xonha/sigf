import { TPeriod } from "@/app/api/periods/route";
import { atom } from "recoil";

export const periodsAtom = atom<TPeriod[] | []>({
  key: "periodsAtom",
  default: [],
});
