import { atom } from "recoil";

export type TModalOptions = "" | "classes" | "periods" | "classDate";

export const modalOptionsAtom = atom<TModalOptions>({
  key: "modalOptionsAtom",
  default: "",
});

export const modalIdAtom = atom<string>({
  key: "modalIdAtom",
  default: "",
});

export const modalIsOpenAtom = atom<boolean>({
  key: "modalAtom",
  default: false,
});
