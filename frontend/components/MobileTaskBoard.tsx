"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import BoardList from "./BoardList";
import ThemeSwitcher from "./ThemeSwitcher";
import UserProfile from "./UserProfile";
import { usePathname } from "next/navigation";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

function MobileTaskBoard() {
  const pathname = usePathname();
  const boards = useSelector((state: RootState) => state.board.boards);
  const currentBoardId = pathname?.split("/").pop();
  const currentBoard = boards.find((board) => board.id === currentBoardId);

  return (
    <Popover>
      <PopoverTrigger className="p-0 flex items-center gap-2 !bg-transparent !hover:bg-transparent !active:bg-transparent">
        <h2 className="text-base md:text-xl">
          {currentBoard ? currentBoard.title : "All boards"}
        </h2>

        <Image
          src={"/assets/icon-chevron-down.svg"}
          alt="icon chevron"
          width={100}
          height={100}
          className="w-4"
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 bg-background border-0 mt-7 w-80 shadow-lg px-0">
        <BoardList />
        <ThemeSwitcher />
        <UserProfile text={true} />
      </PopoverContent>
    </Popover>
  );
}

export default MobileTaskBoard;
