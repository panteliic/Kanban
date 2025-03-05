"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CreateTask from "./CreateTask";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import MobileTaskBoard from "./MobileTaskBoard";


function Navbar() {
  const lightMode = useSelector((state: RootState) => state.theme.lightMode);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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

      <div className="px-5 flex justify-between items-center md:w-[calc(100vw-20rem)]">
        <h1 className="text-2xl font-semibold text-foreground hidden md:flex">
          Platform Launch
        </h1>
        <div className="flex gap-5 items-center">
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
              <span className="cursor-pointer font-semibold capitalize text-red-500 transition hover:opacity-65">
                delete board
              </span>
            </PopoverContent>
          </Popover>

          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
