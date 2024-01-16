import { TAttendance } from "@/app/api/attendance/route";
import {
  createAttendances,
  readApprovedEnrollments,
} from "@/app/controllers/Attendance";
import {
  createClassDates,
  deleteClassDates,
} from "@/app/controllers/ClassDates";
import { readClass } from "@/app/controllers/Classes";
import { classDatesAtom } from "@/app/utils/atoms/classDatesAtom";
import { getWeekDays } from "@/app/utils/functions";
import { useParams } from "next/navigation";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import CreateClassDateModal, {
  CreateClassDateModalRef,
} from "./CreateClassDateModal";

export default function GenerateClassDates() {
  const createClassDateModalRef = useRef<CreateClassDateModalRef>(null);
  const [classDates, setClassDates] = useRecoilState(classDatesAtom);
  const classId = useParams().id;
  const toggleModal = () => createClassDateModalRef.current?.toggleModal();

  async function handleDeleteAllClassDates() {
    deleteClassDates(classId);
    setClassDates([]);
  }

  async function handleCreateAllClassDates() {
    const classData = await readClass(classId);

    const weekDays = classData.week_days;
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

  return (
    <div className="flex gap-4">
      <CreateClassDateModal ref={createClassDateModalRef} />
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        onClick={toggleModal}
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
        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        onClick={handleDeleteAllClassDates}
      >
        Deletar Todas
      </button>
    </div>
  );
}
