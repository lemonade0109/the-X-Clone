"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  likeTweetAction,
  unlikeTweetAction,
} from "@/lib/actions/tweet/tweetActions";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";

const LikeIcon = ({
  likesCount,
  isLiked,
  id,
}: {
  likesCount: number;
  isLiked: boolean;
  id: string;
}) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isLikePending, startTransition] = React.useTransition();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger disabled={isLikePending}>
          <div className="flex items-center justify-center group">
            <div
              onClick={() => {
                if (userId) {
                  startTransition(() => {
                    if (isLiked) {
                      unlikeTweetAction({ id, userId });
                      toast({
                        description: "Tweet unliked",
                      });
                    } else {
                      likeTweetAction({ id, userId });
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
              {likesCount ?? 0}
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
  );
};

export default LikeIcon;
