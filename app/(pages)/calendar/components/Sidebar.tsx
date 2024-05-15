import { usersAtom } from "@/app/atoms/usersAtom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";

export default function Sidebar(props: { children: React.ReactNode }) {
  const user = useRecoilValue(usersAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (user?.userRole !== "admin") return null;

  return (
    <>
      <button
        className="xl:hidden p-2 border-l rounded-none"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {isSidebarOpen ? (
        <aside
          className={`sticky w-52 xl:block h-[calc(100vh-64px)] border-gray-300 border-l border-dashed overflow-hidden ${isSidebarOpen ? "block" : "hidden"}`}
        >
          {props.children}
        </aside>
      ) : (
        <aside
          className={`sticky w-52 hidden xl:block h-[calc(100vh-64px)] border-gray-300 border-l overflow-hidden ${isSidebarOpen ? "block" : "hidden"}`}
        >
          {props.children}
        </aside>
      )}
    </>
  );
}
