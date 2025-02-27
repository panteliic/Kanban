import React from "react";
import SideBarButton from "./SideBarButton";
import Image from "next/image";

function BoardList() {
  const boards = [
    { boardName: "Platform Launch", active: true },
    { boardName: "Marketing Plan", active: false },
    { boardName: "Roadmap", active: false },
  ];
  return (
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
  );
}

export default BoardList;
