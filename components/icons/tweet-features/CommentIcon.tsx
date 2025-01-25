/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Fragment } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { FaRegComment } from "react-icons/fa6";
import PostyourreplyButton from "@/components/ui/PostyourreplyButton";

const CommentIcon = ({ tweet, commentCount }: any) => {
  const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="flex items-center justify-center group">
            <Fragment>
              <Dialog
                open={isReplyModalOpen}
                onOpenChange={setIsReplyModalOpen}
              >
                <DialogTrigger asChild>
                  <div className="flex items-center justify-center group-hover:bg-twitter/30 rounded-full w-10 h-10">
                    <FaRegComment className="w-6 h-6 text-gray-500 group-hover:text-twitter " />
                  </div>
                </DialogTrigger>

                <DialogContent className="flex flex-col max-w-3xl h-auto py-12 space-y-0 ">
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-4">
                      <div className="w-12 h-12  rounded-full relative">
                        <Image
                          src={tweet.author.profileImage}
                          alt="profile image"
                          fill
                          className="rounded-full"
                        />
                      </div>

                      <div className="flex justify-between ">
                        <Link
                          href={`/${tweet.author.userName}`}
                          className="flex items-center space-x-2"
                        >
                          <h3 className="font-bold text-lg truncate">
                            {tweet.author.name}
                          </h3>
                          <p className="text-gray-500 tracking-normal truncate">
                            @{tweet.author.userName}
                          </p>
                        </Link>
                      </div>
                    </DialogTitle>

                    <DialogDescription className="max-w-sm pl-16">
                      <span className="text-lg text-white">{tweet.text}</span>
                    </DialogDescription>
                  </DialogHeader>

                  <PostyourreplyButton
                    tweet={tweet}
                    setIsReplyModalOpen={setIsReplyModalOpen}
                  />
                </DialogContent>
              </Dialog>

              <span className="text-gray-500 group-hover:text-twitter">
                {commentCount ?? 0}
              </span>
            </Fragment>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
        >
          <p>Reply</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CommentIcon;
