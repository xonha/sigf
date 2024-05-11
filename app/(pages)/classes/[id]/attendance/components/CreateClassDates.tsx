import { TAttendance } from "@/app/api/attendance/route";
import { readClass } from "@/app/api/classes/controller";
import {
  createAttendances,
  readApprovedEnrollments,
} from "@/app/controllers/Attendance";
import {
  createClassDates,
  deleteClassDates,
} from "@/app/controllers/ClassDates";
import { classDatesAtom } from "@/app/utils/atoms/classDatesAtom";
import {
  TModalOptions,
  modalIsOpenAtom,
  modalOptionsAtom,
} from "@/app/utils/atoms/modalAtom";
import { getWeekDays } from "@/app/utils/functions";
import { useParams } from "next/navigation";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function GenerateClassDates() {
  const [classDates, setClassDates] = useRecoilState(classDatesAtom);
  const classId = useParams().id;
  const setIsModalOpen = useSetRecoilState(modalIsOpenAtom);
  const setModalOption = useSetRecoilState(modalOptionsAtom);

  async function handleDeleteAllClassDates() {
    deleteClassDates(classId);
    setClassDates([]);
  }

  async function handleCreateAllClassDates() {
    const classData = await readClass(classId);

    const weekDays = classData.weekDays.split(",");
    const startDate = new Date(classData.period.startDate + "EDT");
    const endDate = new Date(classData.period.endDate + "EDT");

    const weekDaysDates = getWeekDays(startDate, endDate, weekDays);
    const classDates = await createClassDates(classId, weekDaysDates);
    const approvedEnrollments = await readApprovedEnrollments(classId);

    const attendances = classDates.flatMap((classDate) => {
      return approvedEnrollments.map((enrollment) => {
        return { classDateId: classDate.id, userId: enrollment.userId };
      });
    });

    setClassDates(classDates);
    createAttendances(attendances as TAttendance[]);
  }

  function openModal(modalOption: TModalOptions) {
    setModalOption(modalOption);
    setIsModalOpen(true);
  }

  return (
    <div className="flex gap-4">
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={() => openModal("classDate")}
      >
        Criar Aula
      </button>
      {classDates.length === 0 && (
        <button
          className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateAllClassDates}
        >
          Gerar Todas
        </button>
      )}
      <button
        className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteAllClassDates}
      >
        Deletar Todas
      </button>
    </div>
  );
}
