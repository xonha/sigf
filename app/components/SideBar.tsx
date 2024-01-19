import {
  FaBoxArchive,
  FaCalendar,
  FaHourglassHalf,
  FaUserGear,
} from "react-icons/fa6";
import ClassesMenu from "./ClassesMenu";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  return (
    <aside className="sticky bg-white w-[300px] h-[calc(100vh-64px)] border-gray-300 border-r-[1px]">
      <ClassesMenu />
      <SideBarButton text="Agenda" icon={<FaCalendar />} href="/calendar" />
      <SideBarButton
        text="Períodos"
        icon={<FaHourglassHalf />}
        href="/periods"
      />
      <SideBarButton text="Usuários" icon={<FaUserGear />} href="/users" />
      <SideBarButton text="Arquivadas" icon={<FaBoxArchive />} />
    </aside>
  );
}
