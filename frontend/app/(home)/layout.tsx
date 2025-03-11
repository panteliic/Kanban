"use client";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = useSelector((state: RootState) => state.loading.isLoading);

  if (loading) {
    return <div className="w-screen h-screen bg-background flex justify-center items-center overflow-hidden ">
      <Loading />
    </div>;
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
