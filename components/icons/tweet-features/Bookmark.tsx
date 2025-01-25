"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import {
  createTweetBookmarkAction,
  removeTweetBookmarkAction,
} from "@/lib/actions/tweet/tweetActions";

const Bookmark = ({
  isBookmarked,
  id,
}: {
  isBookmarked: boolean;
  id: string;
}) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isBookmarkPending, startTransition] = React.useTransition();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger disabled={isBookmarkPending} className="group">
          <div
            onClick={() => {
              if (userId) {
                startTransition(() => {
                  if (isBookmarked) {
                    removeTweetBookmarkAction({ id, userId });
                    toast({
                      description: "Tweet removed from bookmark",
                    });
                  } else {
                    createTweetBookmarkAction({ id, userId });
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
  );
};

export default Bookmark;
