"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";
import BoardList from "./BoardList";
import { Button } from "./ui/button";

function Sidebar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const storedHidden = localStorage.getItem("sidebarHidden");
    if (storedHidden !== null) {
      setHidden(JSON.parse(storedHidden));
    }
  }, []);

  const toggleSidebar = (value: boolean) => {
    setHidden(value);
    localStorage.setItem("sidebarHidden", JSON.stringify(value));
  };

  return (
    <div
      className={`h-[calc(100vh-6rem)] overflow-auto hidden bg-background border-r-2 border-border flex-col justify-between py-5 md:flex transition-[width] ${
        hidden ? "w-0 overflow-hidden border-none" : "w-[20rem]"
      }`}
    >
      <BoardList />
      <div className="flex flex-col gap-3">
        <ThemeSwitcher />
        <div
          className="flex gap-1 text-muted-foreground m-auto justify-center cursor-pointer"
          onClick={() => toggleSidebar(true)} 
        >
          <Image
            src="/assets/icon-hide-sidebar.svg"
            alt="hide sidebar"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <h3 className="capitalize">hide sidebar</h3>
        </div>
      </div>
      <Button
        className={`absolute rounded-r-full bottom-3 ${!hidden ? "hidden" : ""}`}
        onClick={() => toggleSidebar(false)} 
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
