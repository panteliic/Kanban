import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
function CreateNewBoard() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <h3 className="text-primary text-lg flex items-center gap-2 font-medium px-5 py-3 capitalize cursor-pointer hover:opacity-70 transition">
            <Image
              src={"/assets/icon-blue-board.svg"}
              alt="board logo"
              width={100}
              height={100}
              className="w-5"
            />
            + create new board
          </h3>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 ">
              <label htmlFor="" className="font-semibold">
                Name
              </label>
              <Input type="text" />
            </div>
            <div className="flex flex-col  gap-4 ">
              <label htmlFor="" className="font-semibold">
                Columns
              </label>
              <Input type="text" />
            </div>
            <div>
              <Button
                type="button"
                className="text-primary bg-primary-foreground flex justify-center items-center mt-5 px-5 capitalize rounded-full text-md w-full hover:opacity-80 hover:transition-all hover:bg-primary-foreground"
              >
                +add new column
              </Button>
              <Button
                type="button"
                className="bg-primary text-primary-foreground flex justify-center items-center mt-5 px-5 capitalize rounded-full text-md w-full"
              >
                create new board
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateNewBoard;
