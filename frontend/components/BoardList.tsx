import React from "react";
import SideBarButton from "./SideBarButton";
import CreateNewBoard from "./CreateNewBoard";


function BoardList() {
  const boards = [
    { boardName: "Platform Launch", active: true },
    { boardName: "Marketing Plan", active: false },
    { boardName: "Roadmap", active: false },
  ];
  return (
    <div>
      <h3 className="text-muted-foreground font-medium uppercase px-5 mb-5">
        all boards (3)
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
      <CreateNewBoard/>
    </div>
  );
}

export default BoardList;
