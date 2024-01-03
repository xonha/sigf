import { Database } from "@/database.types";
import { atom } from "recoil";

export const periodsAtom = atom<
  Database["public"]["Tables"]["period"]["Insert"][] | []
>({
  key: "periodsAtom",
  default: [],
});
