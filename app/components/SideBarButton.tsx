import React from "react";
import Image from "next/image";

interface Props {
    boardName:string;
    active:boolean;
}

function SideBarButton(props:Props) {
  return (
    <li className={`flex gap-2 text-lg items-center font-medium cursor-pointer  px-5 py-3 rounded-r-full w-11/12 ${props.active && "bg-primary"}`}>
      <Image
        src={"/assets/icon-board.svg"}
        alt="board logo"
        width={100}
        height={100}
        className=" w-5"
      />
      {props.boardName}
    </li>
  );
}

export default SideBarButton;
