import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";
import Content from "./components/Content";

export default function HomePage() {
  return (
    <div className="bg-white w-full h-screen">
      <Navbar />
      <div className="flex">
        <SideBar />
        <Content />
      </div>
    </div>
  );
}
