import { atom } from "recoil";

export const sidebarMainAtom = atom<boolean>({
  key: "sidebarMainAtom",
  default: false,
});
