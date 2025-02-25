"use client";
import React from "react";
import Image from "next/image";
import SideBarButton from "./SideBarButton";
import ThemeSwitcher from "./ThemeSwitcher";

function Sidebar() {
  const boards = [
    { boardName: "Platform Launch", active: true },
    { boardName: "Marketing Plan", active: false },
    { boardName: "Roadmap", active: false },
  ];

  return (
    <div className="h-[calc(100vh-6rem)] w-[20rem] bg-background border-r-2 border-border flex flex-col justify-between py-5">
      <div>
        <h3 className="text-muted-foreground font-medium uppercase px-5 mb-5">
          all boards(3)
        </h3>
        <ul>
          {boards.map((board, index) => (
            <SideBarButton
              key={index}
              boardName={board.boardName}
              active={board.active}
            />
          ))}
        </ul>
        <h3 className="text-primary text-lg flex items-center gap-2 font-medium px-5 py-3 capitalize cursor-pointer hover:opacity-70 transition">
          <Image
            src={"/assets/icon-blue-board.svg"}
            alt="board logo"
            width={100}
            height={100}
            className="w-5"
          />
          + create new board
        </h3>
      </div>
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
