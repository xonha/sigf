import {
  FaBoxArchive,
  FaCalendar,
  FaHourglassHalf,
  FaHouse,
} from "react-icons/fa6";
import ClassesMenu from "./ClassesMenu";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  return (
    <aside className="sticky bg-white w-[300px] h-[calc(100vh-64px)] border-gray-300 border-r-[1px]">
      <div className="flex flex-col border-b-[1px] border-gray-300">
        <SideBarButton text="Início" icon={<FaHouse />} href="/classes" />
        <SideBarButton text="Agenda" icon={<FaCalendar />} href="/calendar" />
      </div>
      <div className="flex flex-col border-b-[1px] border-gray-300">
        <ClassesMenu />
      </div>
      <div className="flex flex-col border-b-[1px] border-gray-300">
        <SideBarButton text="Arquivadas" icon={<FaBoxArchive />} />
        <SideBarButton
          text="Períodos"
          icon={<FaHourglassHalf />}
          href="/periods"
        />
      </div>
    </aside>
  );
}
