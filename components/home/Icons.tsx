"use client";

import React, { Fragment, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  createTweetBookmarkAction,
  likeTweetAction,
  removeTweetBookmarkAction,
  unlikeTweetAction,
} from "@/lib/actions/tweet/tweetActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const Icons = ({
  tweetId,
  likeCount,
  isLiked,
  isBookmarked,
}: {
  tweetId: string;
  likeCount: number | null;
  isLiked: boolean;
  isBookmarked: boolean;
}) => {
  const { toast } = useToast();
  const [isLikePending, startTransition] = useTransition();
  const { userId } = useAuth();

  return (
    <div className="flex justify-between">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center justify-center group">
              <Fragment>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="flex items-center justify-center group-hover:bg-twitter/30 rounded-full w-10 h-10"
                    >
                      <FaRegComment className="w-6 h-6 text-gray-500 group-hover:text-twitter " />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <span className="text-gray-500 group-hover:text-twitter">
                  602
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="flex items-center justify-center group">
              <div className="flex items-center justify-center group-hover:bg-green-950 rounded-full w-10 h-10">
                <FaRetweet className="w-6 h-6 text-gray-500 group-hover:text-green-500" />
              </div>
              <span className="text-gray-500 group-hover:text-green-500">
                1k
              </span>
            </div>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
          >
            <p>Repost</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger disabled={isLikePending}>
            <div className="flex items-center justify-center group">
              <div
                onClick={() => {
                  if (userId) {
                    startTransition(() => {
                      if (isLiked) {
                        unlikeTweetAction({ tweetId, userId });
                        toast({
                          description: "Tweet unliked",
                        });
                      } else {
                        likeTweetAction({ tweetId, userId });
                        toast({
                          description: "Tweet liked",
                        });
                      }
                    });
                  } else {
                    toast({
                      description: "Please login to like a tweet",
                    });
                  }
                }}
                className="flex items-center justify-center group-hover:bg-red-950 rounded-full w-10 h-10"
              >
                {isLiked ? (
                  <FaHeart className="w-6 h-6 text-red-500 " />
                ) : (
                  <FaRegHeart className="w-6 h-6 text-gray-500 group-hover:text-red-500" />
                )}
              </div>
              <span className="text-gray-500 group-hover:text-red-500">
                {likeCount ?? 0}
              </span>
            </div>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
          >
            {isLiked ? "Unlike" : "Like"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="group">
            <div
              onClick={() => {
                if (userId) {
                  startTransition(() => {
                    if (isBookmarked) {
                      removeTweetBookmarkAction({ tweetId, userId });
                      toast({
                        description: "Tweet removed from bookmark",
                      });
                    } else {
                      createTweetBookmarkAction({ tweetId, userId });
                      toast({
                        description: "Tweet bookmarked",
                      });
                    }
                  });
                } else {
                  toast({
                    description: "Please login to bookmark a tweet",
                  });
                }
              }}
              className="flex space-x-1 items-center justify-center group-hover:bg-twitter/30 rounded-full w-10 h-10"
            >
              {isBookmarked ? (
                <IoBookmark className="w-6 h-6 text-twitter" />
              ) : (
                <IoBookmarkOutline className="w-6 h-6 text-gray-500 group-hover:text-twitter" />
              )}
            </div>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className="rounded-sm bg-white/50 text-white/70 tracking-normal text-sm px-1 py-0"
          >
            {isBookmarked ? "Remove from bookmark" : "Bookmark"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Icons;
