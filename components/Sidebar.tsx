"use client";
import React from "react";
import Image from "next/image";
import SideBarButton from "./SideBarButton";
import ThemeSwitcher from "./ThemeSwitcher";
import BoardList from "./BoardList";

function Sidebar() {
  return (
    <div className="h-[calc(100vh-6rem)] w-[20rem] bg-background border-r-2 border-border flex-col justify-between py-5 hidden md:flex">
      <BoardList />
      <div className="flex flex-col gap-3">
        <ThemeSwitcher />
        <div className="flex gap-1 text-muted-foreground m-auto justify-center cursor-pointer">
          <Image
            src="/assets/icon-hide-sidebar.svg"
            alt="Dark Mode"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <h3 className=" capitalize">hide sidebar</h3>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
