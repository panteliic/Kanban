import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger>
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
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 bg-background border-0 w-60 shadow-lg">
        <DropdownMenuLabel>
          <div className={`flex items-center m-auto gap-3 rounded-xl  w-full`}>
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <span>{user?.name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border"/>
        <DropdownMenuItem className="cursor-pointer py-2">
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className=" text-red-500 hover:text-red-500 cursor-pointer py-2">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
