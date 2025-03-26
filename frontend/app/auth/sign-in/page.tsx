"use client";
import { Button } from "@/components/ui/button";
import React from "react";

function Page() {
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/auth/google `);
  
  const login = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="w-screen h-screen bg-background flex justify-center items-center flex-col gap-4">
      <h1 className="text-3xl font-bold">Sign in with Google</h1>
      <p className="text-xl text-center">
        To access the app, please sign in using your Google account.
      </p>

      <Button onClick={login}>Sign in with Google</Button>
    </div>
  );
}

export default Page;
