"use client"
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setLoading } from "@/redux/LoadingSlice";
import { setBoards } from "@/redux/boardSlice";
import { usePathname } from "next/navigation";
import { fetchBoards } from "@/utils/boardsList"; 
import SideBarButton from "./SideBarButton";
import CreateNewBoard from "./CreateNewBoard";
import { Board } from "@/types";

function BoardList() {
  const user = useSelector((state: RootState) => state.auth.user);
  const boards = useSelector((state: RootState) => state.board.boards);
  const userId = user?.id;
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (!userId || boards.length > 0) return;

    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const boardsData = await fetchBoards(userId); 

        if (Array.isArray(boardsData)) {
          dispatch(setBoards(boardsData));
        } else {
          dispatch(setBoards([])); 
        }
      } catch (err) {
        console.error("Error fetching boards:", err);
        dispatch(setBoards([])); 
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [userId, dispatch, boards.length, pathname]); 

  return (
    <div>
      <h3 className="text-muted-foreground font-medium uppercase px-5 mb-5">
        All Boards ({boards.length})
      </h3>
      <ul>
        {boards.length > 0 && (
          boards.map((board: Board) => (  
            <SideBarButton
              key={board.id}
              boardName={board.title}
              boardId={board.id}
            />
          ))
        )}
      </ul>
      <CreateNewBoard />
    </div>
  );
}

export default BoardList;
