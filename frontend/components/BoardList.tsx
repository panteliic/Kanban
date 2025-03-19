import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/api";
import SideBarButton from "./SideBarButton";
import CreateNewBoard from "./CreateNewBoard";
import { RootState } from "@/store";
import { setLoading } from "@/redux/LoadingSlice";
import { setBoards } from "@/redux/boardSlice";

interface Board {
  id: string;
  title: string;
}

function BoardList() {
  const user = useSelector((state: RootState) => state.auth.user);
  const boards = useSelector((state: RootState) => state.board.boards);
  const userId = user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || boards.length > 0) return; 

    const fetchBoards = async () => {
    

      try {
        const response = await api.get<Board[]>(`/boards/getBoards/${userId}`);

        if (Array.isArray(response.data)) {
          dispatch(setBoards(response.data));
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

    fetchBoards();
  }, [userId, dispatch, boards.length]); 

  return (
    <div>
      <h3 className="text-muted-foreground font-medium uppercase px-5 mb-5">
        All Boards ({boards.length})
      </h3>
      <ul>
        {boards.length > 0 && (
          boards.map((board) => (
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
