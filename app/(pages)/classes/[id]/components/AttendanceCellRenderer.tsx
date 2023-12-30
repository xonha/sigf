import { useParams, useRouter } from "next/navigation";

export default function AttendanceCellRenderer() {
  const router = useRouter();
  const params = useParams();

  function onClick() {
    router.push(`/classes/${params.id}/attendance`);
  }

  return (
    <button className="0 text-blue-500 font-bold" onClick={onClick}>
      Presença
    </button>
  );
}
