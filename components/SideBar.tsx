import {
  FaHouse,
  FaCalendar,
  FaBoxArchive,
  FaAngleRight,
  FaGear,
} from "react-icons/fa6";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  return (
    <aside className="sticky bg-white w-[300px] h-[calc(100vh-64px)] border-gray-300 border-r-[1px]">
      <div className="flex flex-col border-b-[1px] border-gray-300">
        <SideBarButton text="Início" icon={<FaHouse />} />
        <SideBarButton text="Agenda" icon={<FaCalendar />} />
      </div>
      <div className="flex flex-col border-b-[1px] border-gray-300">
        <SideBarButton text="Turmas" icon={<FaAngleRight />} />
      </div>
      <div className="flex flex-col border-b-[1px] border-gray-300">
        <SideBarButton text="Turmas Arquivadas" icon={<FaBoxArchive />} />
        <SideBarButton text="Configurações" icon={<FaGear />} />
      </div>
    </aside>
  );
}
