import { TUserWithRole } from "@/app/controllers/Users";
import { atom } from "recoil";

export const usersAtom = atom<TUserWithRole>({
  key: "usersAtom",
});
