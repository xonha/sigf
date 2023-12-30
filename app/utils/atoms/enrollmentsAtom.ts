import { atom } from "recoil";

export interface IEnrollmentsAtom {
  classId: string;
}

export const enrollmentsAtom = atom<IEnrollmentsAtom[] | []>({
  key: "enrollmentsAtom",
  default: [],
});
