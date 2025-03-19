import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  boardName: string;
  boardId: string;
}

function SideBarButton({ boardName, boardId }: Props) {
  const pathname = usePathname();
  const currentBoardId = pathname?.split("/").pop();

  const isActive = currentBoardId === boardId;

  return (
    <Link href={`/boards/${boardId}`}>
      <li
        className={`flex gap-2 text-lg items-center font-medium cursor-pointer px-5 py-3 rounded-r-full w-11/12 text-muted-foreground  hover:opacity-50 ${
          isActive && "bg-primary text-primary-foreground"
        }`}
      >
        {isActive ? (
          <Image
            src={"/assets/icon-board.svg"}
            alt="board logo"
            width={100}
            height={100}
            className="w-5"
          />
        ) : (
          <Image
            src={"/assets/icon-gray-board.svg"}
            alt="board logo"
            width={100}
            height={100}
            className="w-5"
          />
        )}
        {boardName}
      </li>
    </Link>
  );
}

export default SideBarButton;
