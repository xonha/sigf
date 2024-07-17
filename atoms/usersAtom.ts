import { TUserWithRole } from "@/app/api/users/service";
import { atom } from "recoil";

export const usersAtom = atom<TUserWithRole | null>({
  key: "usersAtom",
  default: null,
});
