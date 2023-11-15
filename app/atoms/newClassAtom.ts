import { atom } from "recoil";

interface NewClassAtom {
  id: number;
  name: string;
}

export const newClassAtom = atom<NewClassAtom[] | null>({
  key: "newClassAtom",
  default: null,
});
