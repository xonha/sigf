import { atom } from "recoil";

export interface IEnrollmentsAtom {
  classId: string;
}
export interface IEnrollmentCounts {
  max: number;
  led: number;
  leader: number;
}

export const enrollmentsAtom = atom<IEnrollmentsAtom[] | []>({
  key: "enrollmentsAtom",
  default: [],
});

export const enrollmentCountAtom = atom<IEnrollmentCounts>({
  key: "enrollmentLedCountAtom",
  default: { max: 30, led: 0, leader: 0 },
});
