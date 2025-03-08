import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

function UserProfile({ text }: { text: boolean }) {
  const auth = false;
  const login = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };
  return (
    <>
      {auth ? (
        <div
          className={`flex items-center m-auto gap-3 rounded-xl cursor-pointer hover:bg-secondary w-5/6 md:w-full ${
            text && "py-3 px-5"
          }`}
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {text && <span>Nikola Pantelic</span>}
        </div>
      ) : (
        <Button
          className="w-5/6 md:w-full m-auto bg-primary text-primary-foreground flex justify-center items-center px-5 capitalize text-lg h-12 font-normal"
          onClick={login}
        >
          Sign in
        </Button>
      )}
    </>
  );
}

export default UserProfile;
