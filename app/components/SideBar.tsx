import {
  FaBoxArchive,
  FaCalendar,
  FaHourglassHalf,
  FaPeopleGroup,
  FaUserGear,
} from "react-icons/fa6";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  return (
    <aside className="sticky bg-white w-[50px] md:w-[220px] h-[calc(100vh-64px)] border-gray-300 border-r-[1px] overflow-hidden">
      <SideBarButton
        text="Turmas"
        icon={<FaPeopleGroup className="shrink-0" />}
        href="/classes"
      />
      <SideBarButton
        text="Agenda"
        icon={<FaCalendar className="shrink-0" />}
        href="/calendar"
      />
      <SideBarButton
        text="Períodos"
        icon={<FaHourglassHalf className="shrink-0" />}
        href="/periods"
      />
      <SideBarButton
        text="Usuários"
        icon={<FaUserGear className="shrink-0" />}
        href="/users"
      />
      <SideBarButton
        text="Arquivadas"
        icon={<FaBoxArchive className="shrink-0" />}
      />
    </aside>
  );
}
