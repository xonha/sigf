import { TClasses } from "@/app/api/classes/[id]/route";
import { atom, selector } from "recoil";

export const classesAtom = atom<TClasses[] | []>({
  key: "classesAtom",
  default: [],
});

export const sortedClassesSelector = selector<TClasses[] | []>({
  key: "sortedNewClassSelector",
  get: ({ get }) => {
    const newClasses = get(classesAtom);
    return [...newClasses].sort((a, b) => a.name.localeCompare(b.name));
  },
});
