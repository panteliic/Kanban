"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import BoardList from "./BoardList";
import ThemeSwitcher from "./ThemeSwitcher";

function MobileTaskBoard() {
  return (
    <Popover>
      <PopoverTrigger className="p-0 flex items-center gap-2 !bg-transparent !hover:bg-transparent !active:bg-transparent">
        <h2 className="text-xl"> Platform Launch</h2>
        <Image
          src={"/assets/icon-chevron-down.svg"}
          alt="icon chevron"
          width={100}
          height={100}
          className=" w-4 "
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-3 bg-background border-0  mt-7 w-80 shadow-lg px-0">
        <BoardList />
        <ThemeSwitcher />
      </PopoverContent>
    </Popover>
  );
}

export default MobileTaskBoard;
