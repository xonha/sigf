import { atom, selector } from "recoil";

interface NewClassAtom {
  id: number;
  name: string;
}

export const newClassAtom = atom<NewClassAtom[] | []>({
  key: "newClassAtom",
  default: [],
});

export const sortedNewClassSelector = selector<NewClassAtom[] | []>({
  key: "sortedNewClassSelector",
  get: ({ get }) => {
    const newClasses = get(newClassAtom);
    return [...newClasses].sort((a, b) => a.name.localeCompare(b.name));
  },
});
