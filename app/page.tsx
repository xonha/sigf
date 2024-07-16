import Content from "@/components/Content";
import MainModal from "@/components/MainModal";
import NavbarHome from "@/components/NavbarHome";

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
