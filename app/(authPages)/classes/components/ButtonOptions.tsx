import { deleteClass } from "@/app/api/classes/controller";
import { useModal } from "@/app/components/MainModal";
import { classesAtom } from "@/atoms/classesAtom";
import { useRecoilState } from "recoil";
import { toast } from "sonner";

export default function ButtonOptions(props: { id: string }) {
  const classId = props.id;
  const [classes, setClasses] = useRecoilState(classesAtom);
  const openModal = useModal();

  async function handleDeleteClass() {
    toast.info("Excluindo classe...");
    try {
      await deleteClass(classId);
    } catch (error) {
      toast.error("Erro ao excluir classe");
      return;
    }
    setClasses(classes.filter((classItem) => classItem.id !== classId));
    toast.success("Classe excluída com sucesso!");
  }

  return (
    <div className="flex gap-2">
      <button
        className="text-blue-500 hover:text-blue-400 font-bold"
        onClick={() => openModal("classes", classId)}
      >
        Editar
      </button>
      <button
        className="text-orange-500 hover:text-orange-400 font-bold"
        onClick={handleDeleteClass}
      >
        Excluir
      </button>
    </div>
  );
}
