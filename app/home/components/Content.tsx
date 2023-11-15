"use client";

import { FaEllipsisVertical, FaBookmark } from "react-icons/fa6";
import { newClassAtom } from "@/app/atoms/newClassAtom";
import { useRecoilState } from "recoil";

export default function Content() {
  const [newClasses, setNewClasses] = useRecoilState(newClassAtom);

  return (
    <div className="w-full">
      <ol className="flex flex-wrap gap-6 p-6">
        {newClasses &&
          newClasses.map((classItem, index) => (
            <li
              key={index}
              className="w-[300px] h-[160px] border border-gray-300 rounded-[10px]"
            >
              <div className="h-[100px] flex flex-row p-4 items-center justify-center">
                {classItem.name}
              </div>

              <div className="flex flex-row-reverse gap-6 pt-5 px-4 relative border-t items-center">
                <FaEllipsisVertical />
                <FaBookmark />
              </div>
            </li>
          ))}
      </ol>
    </div>
  );
}
