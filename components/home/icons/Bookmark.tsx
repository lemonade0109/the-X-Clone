"use client";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import {
  createTweetBookmarkAction,
  removeTweetBookmarkAction,
} from "@/lib/actions/tweet/tweetActions";
import { TooltipContainer } from "@/components/ui/tooltipContainer";

const BookmarkIcon = ({
  isBookmarked,
  id,
}: {
  isBookmarked: boolean | undefined;
  id: string;
}) => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [isBookmarkPending, startTransition] = React.useTransition();

  return (
    <TooltipContainer
      content={isBookmarked ? "Remove from bookmark" : "Bookmark"}
      variant="blackShade"
      disabled={isBookmarkPending}
    >
      <div className="group">
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
      </div>
    </TooltipContainer>
  );
};

export default BookmarkIcon;
