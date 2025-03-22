"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateTask from "./CreateTask";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import MobileTaskBoard from "./MobileTaskBoard";
import UserProfile from "./UserProfile";
import { usePathname, useRouter } from "next/navigation";
import api from "@/utils/api";
import { deleteBoard as deleteBoardAction } from "@/redux/boardSlice";

function Navbar() {
  const lightMode = useSelector((state: RootState) => state.theme.lightMode);
  const boards = useSelector((state: RootState) => state.board.boards);
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkScreenSize = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const currentBoardId = pathname?.split("/").pop();
  let currentBoard;
  if (currentBoardId !== "")
    currentBoard = boards.find((board) => board.id === currentBoardId);

  const deleteBoard = async () => {
    try {
      await api.delete(`/boards/delete/${currentBoardId}`);
      dispatch(deleteBoardAction(currentBoardId || ""));
      return router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-24 border-b-2 border-border bg-background flex items-center justify-between">
      <div className="w-auto md:w-[20rem] h-full border-0 md:border-r-2 border-border flex items-center px-5">
        {mobile ? (
          <div className="flex items-center gap-4">
            <Image
              src={"/assets/logo-mobile.svg"}
              alt="Logo"
              width={50}
              height={50}
              className="w-7"
            />
            <MobileTaskBoard />
          </div>
        ) : !lightMode ? (
          <Image
            src={"/assets/logo-light.svg"}
            alt="Logo"
            width={100}
            height={100}
            className="w-36"
          />
        ) : (
          <Image
            src={"/assets/logo-dark.svg"}
            alt="Logo"
            width={100}
            height={100}
            className="w-36"
          />
        )}
      </div>

      <div
        className={`px-5 flex items-center md:w-[calc(100vw-20rem)] ${
          pathname === "/" ? " justify-end" : "justify-between"
        }`}
      >
        {pathname !== "/" && (
          <h1 className="text-2xl font-semibold text-foreground hidden md:flex">
            {currentBoard ? currentBoard.title : "Board Not Found"}
          </h1>
        )}
        <div className="flex gap-5 items-center ">
          {pathname !== "/" && (
            <>
              <CreateTask />
              <Popover>
                <PopoverTrigger className="p-0 bg-transparent hover:bg-transparent active:bg-transparent">
                  <Image
                    src={"/assets/icon-vertical-ellipsis.svg"}
                    alt="settings board"
                    width={100}
                    height={100}
                    className="w-1"
                  />
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-3 bg-background border-0 mr-20 mt-5 w-60 shadow-lg">
                  <span className="cursor-pointer font-semibold capitalize text-muted-foreground transition hover:opacity-65">
                    edit board
                  </span>
                  <span
                    className="cursor-pointer font-semibold capitalize text-red-500 transition hover:opacity-65"
                    onClick={deleteBoard}
                  >
                    delete board
                  </span>
                </PopoverContent>
              </Popover>
            </>
          )}

          <div className="hidden md:flex w-auto ml-auto">
            <UserProfile text={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
