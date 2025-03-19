import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/api";
import SideBarButton from "./SideBarButton";
import CreateNewBoard from "./CreateNewBoard";
import { RootState } from "@/store";
import { setLoading } from "@/redux/LoadingSlice";
import { setBoards } from "@/redux/boardSlice";

function BoardList() {
  const boards = useSelector((state: RootState) => state.board.boards);
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || boards.length > 0) return;

    const fetchBoards = async () => {
      dispatch(setLoading(true));

      try {
        const response = await api.get(`/boards/getBoards/${userId}`);
        dispatch(setBoards(response.data || []));
      } catch (err) {
        console.error("Error fetching boards:", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchBoards();
  }, [userId, boards.length, dispatch]);

  return (
    <div>
      <h3 className="text-muted-foreground font-medium uppercase px-5 mb-5">
        All Boards ({boards.length})
      </h3>
      <ul>
        {boards.map((board) => (
          <SideBarButton
            key={board.id}
            boardName={board.title}
            active={false}
          />
        ))}
      </ul>
      <CreateNewBoard />
    </div>
  );
}

export default BoardList;
