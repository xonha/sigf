import Content from "@/app/components/Content";
import MainModal from "@/app/components/MainModal";
import NavbarHome from "@/app/components/NavbarHome";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <MainModal />
      <NavbarHome />
      <Content />
    </div>
  );
}
