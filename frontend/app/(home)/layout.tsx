"use client";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { setUser } from "@/redux/authSlice";
import { setLoading } from "@/redux/LoadingSlice";
import { RootState } from "@/store";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-background flex justify-center items-center overflow-hidden ">
        <Loading />
      </div>
    );
  }
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center w-full h-full">
        <div className="w-full mx-auto flex">
          <Sidebar />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
