import Navbar from "@/app/components/Navbar";
import SideBar from "@/app/components/SideBar";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
