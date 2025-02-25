import Image from "next/image";
import React from "react";

function Navbar() {
  return (
    <div className="w-screen h-24 border-b-2 border-border bg-foreground flex items-center">
      <div className="w-1/6 h-full border-r-2 border-border flex items-center px-5">
        <Image
          src={"/assets/logo-light.svg"}
          alt="Logo"
          width={100}
          height={100}
          className=" w-36"
        />
      </div>
      <div className="px-5">
        <h1 className="text-2xl font-semibold">Platform Launch</h1>
        
      </div>
    </div>
  );
}

export default Navbar;
