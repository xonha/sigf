"use client";

import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { TPeriod } from "../api/periods/route";
import { periodsAtom } from "../utils/atoms/periodsAtom";

async function fetchPeriods() {
  try {
    const res = await fetch("/api/periods");
    const periods: TPeriod[] = await res.json();
    return periods;
  } catch (error) {
    console.error("Error fetching periods:", error);
    throw error;
  }
}

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setPeriods = useSetRecoilState(periodsAtom);

  async function handleLoadGlobalStates() {
    const periods = await fetchPeriods();
    setPeriods(periods);
  }

  useEffect(() => {
    handleLoadGlobalStates();
  }, []);

  return (
    <div className="bg-white w-full h-screen">
      <Navbar />
      <div className="flex">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
