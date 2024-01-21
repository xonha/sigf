"use client";

import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import MainModal from "../components/MainModal";
import { readPeriods } from "../controllers/Periods";
import { periodsAtom } from "../utils/atoms/periodsAtom";
import { usersAtom } from "../utils/atoms/usersAtom";

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
      // const user = await readUserWithRole();

      setPeriods(periods);
      // setUsers(user);
    }
    handleLoadGlobalStates();
  }, []);

  return (
    <div className="bg-white w-full h-screen">
      <MainModal />
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="ag-theme-quartz flex-grow flex">{children}</div>
      </div>
    </div>
  );
}
