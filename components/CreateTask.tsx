"use client"; 
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function CreateTask() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 800) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  return (
    <Dialog>
      {mobile ? (
        <DialogTrigger className="bg-primary text-primary-foreground flex justify-center items-center px-5 capitalize rounded-full text-lg h-12">
          +
        </DialogTrigger>
      ) : (
        <DialogTrigger className="bg-primary text-primary-foreground flex justify-center items-center px-5 capitalize rounded-full text-lg h-12">
          + add new task
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 ">
            <label htmlFor="" className="font-semibold">
              Title
            </label>
            <Input type="text" />
          </div>
          <div className="flex flex-col gap-4 ">
            <label htmlFor="" className="font-semibold">
              Description
            </label>
            <Textarea />
          </div>
          <div>
            <h3 className="font-semibold mb-3">Submusk</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex gap-3 items-center">
                <Input type="text" />
                <Image
                  src={"/assets/icon-cross.svg"}
                  alt="settings board"
                  width={100}
                  height={100}
                  className=" w-4 "
                />
              </li>
              <li className="flex gap-3 items-center">
                <Input type="text" />
                <Image
                  src={"/assets/icon-cross.svg"}
                  alt="settings board"
                  width={100}
                  height={100}
                  className=" w-4 "
                />
              </li>
            </ul>
            <Button
              type="button"
              className="bg-primary text-primary-foreground flex justify-center items-center mt-5 px-5 capitalize rounded-full text-md h-12 w-full"
            >
              +add new submask
            </Button>
          </div>
          <div className="flex flex-col gap-4 ">
            <label htmlFor="" className="font-semibold">
              Status
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Todo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="doing">Doing</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTask;
