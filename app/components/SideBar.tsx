import {
  FaCalendar,
  FaHourglassHalf,
  FaPeopleGroup,
  FaUserGear,
} from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import { sidebarMainAtom } from "../atoms/sidebarsAtom";
import { usersAtom } from "../atoms/usersAtom";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  const user = useRecoilValue(usersAtom);
  const sidebarIsOpen = useRecoilValue(sidebarMainAtom);
  const isAdmin = user?.userRole === "admin";
  const buttons = [
    { text: "Turmas", icon: <FaPeopleGroup />, href: "/classes" },
    { text: "Calendários", icon: <FaCalendar />, href: "/calendar" },
    isAdmin && {
      text: "Períodos",
      icon: <FaHourglassHalf />,
      href: "/periods",
    },
    isAdmin && {
      text: "Usuários",
      icon: <FaUserGear />,
      href: "/users",
    },
  ];
  return (
    <aside
      className={`sticky bg-white ${sidebarIsOpen ? "block" : "hidden"} md:block w-52 h-[calc(100vh-64px)] border-gray-300 border-r overflow-hidden shrink-0`}
    >
      {buttons.map((button, index) => {
        if (!button) return null;
        return (
          <SideBarButton
            key={index}
            text={button.text}
            icon={button.icon}
            href={button.href}
          />
        );
      })}
    </aside>
  );
}
