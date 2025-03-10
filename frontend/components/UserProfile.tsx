import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function UserProfile({ text }: { text: boolean }) {
  const login = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };
  const user = useSelector((state: RootState) => state.auth.user);
  const getInitials = (name: string | undefined): string => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return initials.toUpperCase();
  };
  
  return (
    <div
      className={`flex items-center m-auto gap-3 rounded-xl cursor-pointer hover:bg-secondary w-5/6 md:w-full md:rounded-full ${
        text && "py-3 px-5"
      }`}
    >
      <Avatar>
        <AvatarImage src={user?.avatar} />
        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
      </Avatar>

      {text && <span>{user?.name}</span>}
    </div>
  );
}

export default UserProfile;
