import { usersAtom } from "@/app/atoms/usersAtom";
import { useRecoilValue } from "recoil";

export default function Sidebar(props: { children: React.ReactNode }) {
  const user = useRecoilValue(usersAtom);

  if (user?.userRole !== "admin") return null;

  return (
    <aside className="sticky w-52 hidden xl:block h-[calc(100vh-64px)] border-gray-300 border-l overflow-hidden">
      {props.children}
    </aside>
  );
}
