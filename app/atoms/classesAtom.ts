import { atom, selector } from "recoil";

interface classesAtom {
  id: string;
  name: string;
}

export const classesAtom = atom<classesAtom[] | []>({
  key: "classesAtom",
  default: [],
});

export const sortedClassesSelector = selector<classesAtom[] | []>({
  key: "sortedNewClassSelector",
  get: ({ get }) => {
    const newClasses = get(classesAtom);
    return [...newClasses].sort((a, b) => a.name.localeCompare(b.name));
  },
});
