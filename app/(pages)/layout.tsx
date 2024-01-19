"use client";

import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import MainModal from "../components/MainModal";
import { readPeriods } from "../controllers/Periods";
import { periodsAtom } from "../utils/atoms/periodsAtom";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setPeriods = useSetRecoilState(periodsAtom);

  useEffect(() => {
    async function handleLoadGlobalStates() {
      const periods = await readPeriods();
      setPeriods(periods);
    }
    handleLoadGlobalStates();
  }, []);

  return (
    <div className="bg-white w-full h-screen">
      <MainModal />
      <Navbar />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
