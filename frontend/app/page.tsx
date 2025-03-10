"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // 🚀 Koristi `next/navigation`
import api from "@/utils/api";
import KanbanBoard from "@/components/Board";
import { RootState } from "@/store";
import { setUser } from "@/redux/authSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const { data } = await api.get("/auth/user");
          dispatch(setUser(data.user));
        } catch (error) {
          router.push("/auth/sign-in");
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [user, dispatch, router]);

  if (loading) return <p>Loading...</p>;

  
  return <KanbanBoard />;
}
