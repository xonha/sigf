import { atom, selector } from "recoil";

export interface IClassesAtom {
  createdAt: Date;
  description: string | null;
  franchiseId: string | null;
  id: string;
  isActive: boolean;
  name: string;
  periodId: string;
  teacherId: string | null;
  week_days: string;
}

export const classesAtom = atom<IClassesAtom[] | []>({
  key: "classesAtom",
  default: [],
});

export const sortedClassesSelector = selector<IClassesAtom[] | []>({
  key: "sortedNewClassSelector",
  get: ({ get }) => {
    const newClasses = get(classesAtom);
    return [...newClasses].sort((a, b) => a.name.localeCompare(b.name));
  },
});
