import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";

export default function AttendancePage() {
  return (
    <div className="bg-white w-full h-screen">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div>Attendance</div>
      </div>
    </div>
  );
}
