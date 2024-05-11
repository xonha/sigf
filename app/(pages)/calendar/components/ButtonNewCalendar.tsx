import { TCalendar, createCalendar } from "@/app/api/calendar/controller";
import Link from "next/link";
import { useState } from "react";

export default function ButtonNewCalendar(props: {
  calendars: TCalendar[];
  setCalendars: (calendars: TCalendar[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  async function handleSave() {
    const createdCalendar = await createCalendar({ name, url });
    props.setCalendars([...props.calendars, createdCalendar]);
    setIsOpen(false);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  return (
    <div className="flex justify-center border-b border-dashed">
      {isOpen ? (
        <div className="w-full m-4 flex flex-col">
          <label className="text-md" htmlFor="semester">
            Nome
          </label>
          <input
            className="rounded-md px-4 py-2 w-full border mb-4"
            type="text"
            placeholder="Nome do calendário"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="text-md" htmlFor="semester">
            URL
            <a
              className="text-blue-500 pl-1"
              href="https://support.google.com/calendar/answer/41207?hl=pt-BR"
              target="_blank"
            >
              (?)
            </a>
          </label>
          <input
            className="rounded-md px-4 py-2 w-full border mb-4"
            type="url"
            placeholder="URL do calendário"
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex justify-around gap-4">
            <button
              className="border border-gray-700 rounded px-4 py-2 text-black"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            {!name || !url ? (
              <button
                className="border border-gray-700 rounded px-4 py-2 text-black"
                disabled
              >
                Salvar
              </button>
            ) : (
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
              >
                Salvar
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          className="m-4 py-2 px-4 w-full font-bold rounded-md bg-green-500 hover:bg-green-600 text-white"
          onClick={() => setIsOpen(true)}
        >
          Novo Calendário
        </button>
      )}
    </div>
  );
}
