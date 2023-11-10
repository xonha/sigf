import { FaBars } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="border-b-[1px] border-gray-300 h-16 w-full flex items-center flex-row justify-between">
      <div className="flex flex-row items-center pl-4">
        <FaBars />
        <div className="pl-4">SIGF</div>
      </div>

      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Criar Turma
        </button>
      </div>

      <div className="pr-4">
        <img
          src="https://avatars.githubusercontent.com/u/25267506?v=4"
          className="rounded-full h-10 w-10"
        ></img>
      </div>
    </nav>
  );
}
