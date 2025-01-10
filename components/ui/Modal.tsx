"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

import { Button } from "./button";

import { useRouter } from "next/navigation";
import { createUserProfileAction } from "@/lib/actions/profile/profileActions";
import FormContainer from "./FormContainer";

const Modal = () => {
  const router = useRouter();

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const years = Array.from(
    { length: 90 },
    (_, index) => new Date().getFullYear() - index
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} onOpenChange={handleOpenChange} open={true}>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[40%] p-12">
        <FormContainer action={createUserProfileAction}>
          <div className="flex flex-col justify-start space-y-5 p-12">
            <div>
              <DialogHeader className="space-y-2 mb-6">
                <DialogTitle className=" font-bold text-5xl tracking-wide">
                  What should we call you?
                </DialogTitle>

                <DialogDescription className=" text-lg tracking-wider">
                  Your @username is unique. You can always change it later
                </DialogDescription>
              </DialogHeader>
            </div>

            <div className="">
              <input
                className="w-[500px]
                  h-16 rounded-lg 
                  bg-white/5 lowercase
                  px-4 outline-none placeholder:text-sm tracking-wide focus:border-2
                  focus:border-twitter placeholder:focus:text-twitter"
                type="text"
                placeholder="Username"
                required
                name="username"
              />
            </div>

            <span className="py-5  text-md">
              username suggestions, epw, roriri
            </span>
          </div>

          <div className="flex flex-col justify-start p-12">
            <DialogHeader className="space-y-2 mb-6">
              <DialogTitle className="font-bold text-5xl tracking-wide">
                What is your birth date?
              </DialogTitle>

              <DialogDescription className="text-lg tracking-wider">
                This won&apos;t be public
              </DialogDescription>
            </DialogHeader>

            <div className="flex p-4 gap-7 w-full h-36">
              <div className="w-[40%] ">
                <select
                  className="bg-black rounded-lg border-2 border-gray-600 focus:border-twitter
                    focus:text-twitter
                     font-bold text-gray-400 
                      w-full h-[90%] p-2 "
                  name="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                <select
                  className="bg-black rounded-lg border-2 border-gray-600 focus:border-twitter
                    focus:text-twitter 
                     font-bold text-gray-400 
                      w-full h-[90%] p-2 "
                  value={month}
                  name="month"
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {months.map((month, index) => (
                    <option key={index} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[30%]">
                <select
                  className="bg-black rounded-lg border-2 border-gray-600 focus:border-twitter
                    focus-within:text-twitter
                    font-bold text-gray-400 
                     w-full h-[90%] p-2 "
                  value={day}
                  name="day"
                  onChange={(e) => setDay(e.target.value)}
                >
                  <option className="" value="">
                    Select Day
                  </option>
                  {days.map((day) => (
                    <option
                      className="text-lg text-gray-500"
                      key={day}
                      value={day}
                    >
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <div className="border w-44 h-16 rounded-full hover:border-white">
              <Button
                type="submit"
                className="w-full h-full rounded-full  font-bold text-xl"
                onClick={() => router.push("/home")}
              >
                Continue
              </Button>
            </div>
          </DialogFooter>
        </FormContainer>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
