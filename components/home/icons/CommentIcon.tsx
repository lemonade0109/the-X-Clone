/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { Fragment } from "react";

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
import PostyourreplyButton from "@/components/ui/postyourreplyButton";
import {TooltipContainer} from "@/components/ui/tooltipContainer";

const CommentIcon = ({
  name,
  userName,
  tweetTxt,
  profileImage,
  commentCount,
  tweetId,
}: {
  tweetTxt: string;
  userName: string;
  commentCount: number;
  tweetId: string;
  name: string;
  profileImage: string;
}) => {
  const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);

  return (
    <TooltipContainer
      content={"Reply"}
     variant="blackShade">
      <div className="flex items-center justify-center group">
        <Fragment>
          <Dialog open={isReplyModalOpen} onOpenChange={setIsReplyModalOpen}>
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
                      src={profileImage}
                      alt="profile image"
                      fill
                      className="rounded-full"
                    />
                  </div>

                  <div className="flex justify-between ">
                    <Link
                      href={`/${userName}`}
                      className="flex items-center space-x-2"
                    >
                      <h3 className="font-bold text-lg truncate">{name}</h3>
                      <p className="text-gray-500 tracking-normal truncate">
                        @{userName}
                      </p>
                    </Link>
                  </div>
                </DialogTitle>

                <DialogDescription className="max-w-sm pl-16">
                  <span className="text-lg text-white">{tweetTxt}</span>
                </DialogDescription>
              </DialogHeader>

              <PostyourreplyButton
                profileImage={profileImage}
                userName={userName}
                tweetId={tweetId}
                setIsReplyModalOpen={setIsReplyModalOpen}
              />
            </DialogContent>
          </Dialog>

          <span className="text-gray-500 group-hover:text-twitter">
            {commentCount ?? 0}
          </span>
        </Fragment>
      </div>
    </TooltipContainer>
  );
};

export default CommentIcon;
