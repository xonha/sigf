"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import ModalMenu from "./Modal";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => setMenuVisible(!menuVisible);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b-[1px] border-gray-300 h-16 w-full flex items-center flex-row justify-between">
      <div className="flex flex-row items-center pl-4">
        <FaBars />
        <a href="/home" className="pl-4">
          SIGF
        </a>
      </div>

      <div id="__create_class">
        <ModalMenu isOpen={isMenuOpen} onRequestClose={closeMenu} />
        <button
          onClick={openMenu}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4  rounded"
        >
          Criar Turma
        </button>
      </div>

      <div className="pr-4 relative">
        <img
          src="https://avatars.githubusercontent.com/u/25267506?v=4"
          alt="Foto de Perfil"
          onClick={toggleMenu}
          className="cursor-pointer rounded-full h-10 w-10"
        />

        {menuVisible && (
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
