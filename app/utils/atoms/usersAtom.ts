import { TUserWithRole } from "@/app/controllers/Users";
import { atom } from "recoil";

export const usersAtom = atom<TUserWithRole | null>({
  key: "usersAtom",
  default: null,
});
