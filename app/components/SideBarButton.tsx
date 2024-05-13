import Link from "next/link";
import { ReactNode } from "react";
import { useSetRecoilState } from "recoil";
import { sidebarMainAtom } from "../atoms/sidebarsAtom";

export interface ISidebarButton {
  text: string;
  icon?: ReactNode;
  href?: string;
}

export default function SideBarButton({ href, icon, text }: ISidebarButton) {
  const setSidebarIsOpen = useSetRecoilState(sidebarMainAtom);

  return (
    <Link
      className="flex items-center p-4 cursor-pointer"
      onClick={() => setSidebarIsOpen(false)}
      href={href || ""}
    >
      {icon}
      <div className="px-4">{text}</div>
    </Link>
  );
}
