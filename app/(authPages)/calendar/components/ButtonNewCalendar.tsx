import { useModal } from "@/app/components/MainModal";

export default function ButtonNewCalendar() {
  const openModal = useModal();

  return (
    <div className="flex justify-center">
      <button
        className="m-4 py-2 px-4 w-full font-bold rounded-md bg-green-500 hover:bg-green-600 text-white"
        onClick={() => openModal("calendar")}
      >
        Criar Calendário
      </button>
    </div>
  );
}
