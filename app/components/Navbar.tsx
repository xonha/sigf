"use client";

import profilePicture from "@/assets/profile.png";
import { sidebarMainAtom } from "@/atoms/sidebarsAtom";
import { usersAtom } from "@/atoms/usersAtom";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import LogoutButton from "./LogoutButton";
import NavbarButtonIndex from "./NavbarButtonIndex";

export default function Navbar() {
  const profileRef = useRef<HTMLImageElement>(null);
  const user = useRecoilValue(usersAtom);
  const [sidebarIsOpen, setSidebarIsOpen] = useRecoilState(sidebarMainAtom);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);

  function toggleMenu() {
    setProfileMenuVisible(!isProfileMenuVisible);
  }
  function handleClickOutside(event: MouseEvent) {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfileMenuVisible(false);
    }
  }
  function addRemoveEventListeners() {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }

  useEffect(addRemoveEventListeners, []);

  return (
    <nav className="border-b-[1px] border-gray-300 h-16 w-full flex items-center flex-row justify-between">
      <div className="flex flex-row items-center pl-4 gap-4">
        <FaBars
          className="cursor-pointer"
          onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
        />
        <Link className="font-bold" href="/classes">
          SIGF
        </Link>
      </div>

      {user?.userRole === "admin" && <NavbarButtonIndex />}

      <div className="pr-4 relative">
        <img
          src={user?.user_metadata?.avatar_url || profilePicture.src}
          alt="Foto de Perfil"
          ref={profileRef}
          onClick={toggleMenu}
          className="cursor-pointer rounded-full h-10 w-10"
        />

        {isProfileMenuVisible && (
          <ul className="absolute right-4 bg-white border rounded-[10px] pt-2 px-2 flex flex-col items-center z-50">
            <li className="pb-2">{user?.email}</li>
            <li className="pb-2">
              <LogoutButton />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
