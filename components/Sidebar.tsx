"use client";
import React, { useState } from "react";
import Image from "next/image";
import SideBarButton from "./SideBarButton";
import ThemeSwitcher from "./ThemeSwitcher";
import BoardList from "./BoardList";
import { Button } from "./ui/button";

function Sidebar() {
  const [hidden, setHidden] = useState(false);
  return (
    <div
      className={`h-[calc(100vh-6rem)] w-[20rem] bg-background border-r-2 border-border flex-col justify-between py-5 hidden md:flex transition-all ${
        hidden && "w-0 overflow-hidden border-r-0"
      }`}
    >
      <BoardList />
      <div className="flex flex-col gap-3">
        <ThemeSwitcher />
        <div className="flex gap-1 text-muted-foreground m-auto justify-center cursor-pointer">
          <Image
            src="/assets/icon-hide-sidebar.svg"
            alt="hide sidebar"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <h3
            className=" capitalize"
            onClick={() => {
              setHidden(!hidden);
            }}
          >
            hide sidebar
          </h3>
        </div>
      </div>
      <Button
        className={`absolute rounded-r-full bottom-3 ${!hidden && "hidden"}`}
        onClick={() => setHidden(!hidden)}
      >
        <Image
          src="/assets/icon-show-sidebar.svg"
          alt="show sidebar"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      </Button>
    </div>
  );
}

export default Sidebar;
