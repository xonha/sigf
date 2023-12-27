"use client";

import { Session } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import supabase from "../api/db";
import CreateClassesModal, {
  CreateClassesModalRef,
} from "./CreateClassesModal";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const profileRef = useRef<HTMLImageElement>(null);
  const modalRef = useRef<CreateClassesModalRef>(null);
  const [isProfileMenuVisible, setProfileMenuVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  function toggleMenu() {
    setProfileMenuVisible(!isProfileMenuVisible);
  }
  function toggleModal() {
    modalRef.current?.toggleModal();
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
  function handleGetSession() {
    supabase.auth
      .getSession()
      .then((session) => setSession(session.data.session ?? null))
      .catch((err) => {
        console.log("ERROR GET SESSION: ", err);
      });
  }

  useEffect(handleGetSession, []);
  useEffect(addRemoveEventListeners, []);

  return (
    <nav className="border-b-[1px] border-gray-300 h-16 w-full flex items-center flex-row justify-between">
      <div className="flex flex-row items-center pl-4">
        <FaBars />
        <a href="/classes" className="pl-4">
          SIGF
        </a>
      </div>

      <div>
        <CreateClassesModal ref={modalRef} />
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Criar Turma
        </button>
      </div>

      <div className="pr-4 relative">
        <img
          // TODO: fix profile picture
          src={session?.user?.profile_picture_url}
          alt="Foto de Perfil"
          ref={profileRef}
          onClick={toggleMenu}
          className="cursor-pointer rounded-full h-10 w-10"
        />

        {isProfileMenuVisible && (
          <ul className="absolute right-4 bg-white border rounded-[10px] pt-2 px-2 flex flex-col items-center">
            <li className="pb-2">{session?.user?.email}</li>
            <li className="pb-2">
              <LogoutButton />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
