"use client";

import { sortedClassesSelector } from "@/app/atoms/classesAtom";
import { FaRegBookmark } from "react-icons/fa6";
import { useRecoilValue } from "recoil";
import ClassesOptionsButton from "./ClassesOptionsButton";

export default function Content() {
  const sortedNewClasses = useRecoilValue(sortedClassesSelector);

  return (
    <div className="w-full">
      <ol className="flex flex-wrap gap-6 p-6">
        {sortedNewClasses &&
          sortedNewClasses.map((classItem) => (
            <li
              key={classItem.id}
              className="w-[300px] h-[160px] border border-gray-300 rounded-[10px]"
            >
              <div className="h-[100px] flex flex-row p-4 items-center justify-center">
                {classItem.name}
              </div>

              <div className="flex flex-row-reverse gap-6 pt-5 px-4 relative border-t items-center">
                <ClassesOptionsButton id={classItem.id} />
                <FaRegBookmark />
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}
