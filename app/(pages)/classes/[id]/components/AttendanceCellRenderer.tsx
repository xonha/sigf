import { useParams, useRouter } from "next/navigation";

export default function AttendanceCellRenderer() {
  const router = useRouter();
  const params = useParams();

  function onClick() {
    router.push(`/classes/${params.id}/attendance`);
  }

  return (
    <div className="flex gap-4">
      <button className="text-green-500 font-bold" onClick={onClick}>
        Aprovar
      </button>
      <button className="text-red-500 font-bold" onClick={onClick}>
        Revogar
      </button>
      <button className="text-blue-500 font-bold" onClick={onClick}>
        Editar
      </button>
    </div>
  );
}
