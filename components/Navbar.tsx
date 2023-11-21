"use client";

import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import ModalMenu from "./Modal";

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

      <div id="__create_class">
        <ModalMenu isOpen={isModalOpen} onRequestClose={toggleModal} />
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Criar Turma
        </button>
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
          <ul className="absolute right-4 bg-white border rounded-[10px] w-32 ">
            <li>Configurações</li>
            <li>
              <LogoutButton />{" "}
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
