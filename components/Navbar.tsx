"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import CreateClassesModal from "./CreateClassesModal";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const toggleMenu = () => setProfileMenuVisible(!isProfileMenuVisible);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const profileRef = useRef<HTMLImageElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfileMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="border-b-[1px] border-gray-300 h-16 w-full flex items-center flex-row justify-between">
      <div className="flex flex-row items-center pl-4">
        <FaBars />
        <a href="/home" className="pl-4">
          SIGF
        </a>
      </div>

      <div>
        <CreateClassesModal />
      </div>

      <div className="pr-4 relative">
        <img
          src="https://avatars.githubusercontent.com/u/25267506?v=4"
          alt="Foto de Perfil"
          ref={profileRef}
          onClick={toggleMenu}
          className="cursor-pointer rounded-full h-10 w-10"
        />

        {isProfileMenuVisible && (
          <ul className="absolute right-4 bg-white border rounded-[10px] w-[150px] pt-2 flex flex-col items-center">
            <li className="pb-2">Configurações</li>
            <li className="pb-2">
              <LogoutButton />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
