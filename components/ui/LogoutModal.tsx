"use client";

import { useRouter } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./button";
import { SignOutButton } from "@clerk/nextjs";

const LogoutModal = () => {
  const router = useRouter();

  return (
    <Dialog defaultOpen={true} open={true}>
      <DialogContent className=" shadow-md max-w-[300px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center my-3">
            <FaXTwitter className="w-12 h-12" />
          </DialogTitle>

          <DialogDescription className="flex flex-col space-y-3 px-3">
            <span className="font-bold text-3xl text-white">Logout of X</span>
            <span className="text-gray-500 max-w-[230px] text-lg">
              You can always log back in at any time. if you just want to switch
              accounts, you can do that by adding an existing account.{" "}
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="my-2">
          <div className="flex flex-col space-y-4 w-full ">
            <SignOutButton redirectUrl="/">
              <button className="bg-white rounded-full py-6 font-bold text-black hover:bg-white/80">
                Log out
              </button>
            </SignOutButton>

            <Button
              variant="outline"
              className="rounded-full py-8 font-bold"
              onClick={() => router.push("/home")}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
