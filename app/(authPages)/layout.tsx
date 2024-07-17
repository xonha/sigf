"use client";

import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { readPeriods } from "../api/periods/service";
import { readUserWithRole } from "../api/users/controller";
import MainModal from "@/components/MainModal";
import { periodsAtom } from "@/atoms/periodsAtom";
import { usersAtom } from "@/atoms/usersAtom";

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100dvh-4rem)]">
      <SideBar />
      <div className="flex-grow flex">{children}</div>
    </div>
  );
}

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setPeriods = useSetRecoilState(periodsAtom);
  const setUsers = useSetRecoilState(usersAtom);

  useEffect(() => {
    async function handleLoadGlobalStates() {
      const periods = await readPeriods();
      const user = await readUserWithRole();

      setPeriods(periods);
      setUsers(user);
    }
    handleLoadGlobalStates();
  }, []);

  return (
    <div className="bg-white w-full h-dvh flex flex-col">
      <MainModal />
      <Navbar />
      <Content children={children} />
    </div>
  );
}
