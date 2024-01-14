import Content from "./components/Content";
import NavbarHome from "./components/NavbarHome";

export const dynamic = "force-dynamic";

export default async function Index() {
  return (
    <div className="w-full flex flex-col items-center">
      <NavbarHome />
      <Content />
    </div>
  );
}
