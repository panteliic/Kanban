"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import KanbanBoard from "@/components/Board";
import { RootState } from "@/store";
import { setUser } from "@/redux/authSlice";
import { setLoading } from "@/redux/LoadingSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      dispatch(setLoading(true));
      const fetchUser = async () => {
        try {
          const { data } = await api.get("/auth/user");
          dispatch(setUser(data.user));
        } catch {
          router.push("/auth/sign-in");
        } finally {
          dispatch(setLoading(false));
        }
      };
      fetchUser();
    } else {
      dispatch(setLoading(false));
    }
  }, [user, dispatch, router]);

  return <KanbanBoard />;
}
