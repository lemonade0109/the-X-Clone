"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { IoCloseOutline } from "react-icons/io5";
import UploadPost from "./uploadPost";
import { UserProps } from "@/utils/interface";
import Image from "next/image";
import { TooltipContainer } from "./tooltipContainer";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createTweetAction } from "@/lib/actions/tweet/tweetActions";

const ComposepostModal = ({ user }: UserProps) => {
  const [state, formAction] = React.useActionState(createTweetAction, {
    message: "",
  });
  const [isPostText, setIsPostText] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(true);
  const router = useRouter();
  const { toast } = useToast();
  React.useEffect(() => {
    if (state && state.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);
  return (
    <Dialog open={isDialogOpen}>
      <form action={formAction}>
        <input type="hidden" value={isPostText} name="tweets" />
        <DialogContent className="flex flex-col  max-w-3xl h-auto lg:rounded-3xl space-y-20">
          <DialogHeader className="flex flex-col w-full h-full space-y-10">
            <DialogTitle className="flex items-center justify-between ">
              <TooltipContainer content="Close" variant={"blackShade"}>
                <div
                  onClick={() => router.back()}
                  className="flex items-center justify-center w-10 h-10  hover:bg-white/10 rounded-full cursor-pointer"
                >
                  <IoCloseOutline
                    onClick={() => setIsDialogOpen(false)}
                    className="w-7 h-7"
                  />
                </div>
              </TooltipContainer>

              <div className="flex items-center justify-center hover:bg-twitter/30 hover:rounded-full w-20 h-10 ">
                <button className="text-twitter">Drafts</button>
              </div>
            </DialogTitle>

            <div className="flex my-4 w-full h-full gap-3">
              <div className="relative  m-2 justify-start w-16 h-14">
                <Image
                  src={user.profileImage}
                  alt="profile image"
                  fill
                  className="rounded-full"
                />
              </div>

              <UploadPost
                value={isPostText}
                onChange={(e) => setIsPostText(e.target.value)}
                onClick={() => router.push("/home")}
                imgName="image"
                buttonText="Post"
                buttonType="submit"
                placeholder="What's happening?!"
                autoFocus={true}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ComposepostModal;
