import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  text: string;
  icon: ReactNode;
  href?: string;
}

export default function SideBarButton(props: Props) {
  const { href = "/web", icon, text } = props;
  return (
    <Link href={href} className="flex items-center p-4 cursor-pointer">
      {icon}
      <div className="px-4">{text}</div>
    </Link>
  );
}
