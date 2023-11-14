import { atom } from "recoil";

interface NewClassAtom {
  name: string;
}

export const newClassAtom = atom<NewClassAtom | null>({
  key: "newClassAtom",
  default: null,
});
