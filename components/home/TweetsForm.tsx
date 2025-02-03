"use client";
import React, { ChangeEvent } from "react";
import { createTweetAction } from "@/lib/actions/tweet/tweetActions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import PostButton from "../ui/postButton";
import IconSelectors from "../ui/iconSelectors";
import { IoCloseSharp } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

const TweetsForm = ({ userImage }: { userImage: string | undefined }) => {
  const [text, setText] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  //const [imageUploading, setImageUploading] = React.useState(true);
  const [formState, formAction, isPending] = React.useActionState(
    createTweetAction,
    {
      message: "",
    }
  );

  const { toast } = useToast();

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (formData: FormData) => {
    if (image) {
      formData.append("image", image);
    }
    //   setImageUploading(true);
    formAction(formData);
    //  setImageUploading(false);
    setText("");
    setImage(null);
    setImageUrl(null);
  };

  React.useEffect(() => {
    if (formState && formState.message) {
      toast({ description: formState.message });
    }
  }, [formState, toast]);

  return (
    <form action={handleSubmit}>
      <div className="flex pt-3 ">
        <div className="w-14 h-12 relative mx-2">
          <Image
            src={userImage!}
            alt="user profile image"
            fill
            className="rounded-full"
          />
        </div>
        <div className=" flex flex-col w-full h-full  py-4 space-y-7 bg-black">
          <textarea
            value={text}
            onChange={handleTextareaChange}
            placeholder={"What's happening!"}
            className="w-full h-full text-start text-xl  pl-3 pt-6 mb-0 pb-0 border-none  outline-none tracking-wide bg-black placeholder:text-3xl"
            name={"text"}
          />

          {imageUrl && (
            <div className="px-4 py-2 relative">
              <img
                src={imageUrl}
                alt="The image selected by the user"
                className={` object-cover w-full max-h-[250px] rounded-2xl  ${
                  imageUploading ? "animate-pulse" : ""
                }`}
              />

              <div className="bg-black/80 absolute top-4 right-7 flex items-center justify-center rounded-full hover:bg-black/40 cursor-pointer w-10 h-10">
                <IoCloseSharp
                  onClick={() => {
                    setImage(null);
                    //setImageUploading(false);
                    setImageUrl(null);
                  }}
                  className="w-8 h-8 text-white/70"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between px-2 ">
            <IconSelectors addImageToPost={addImageToPost} />
            {isPending ? (
              <div className="">
                <CgSpinner className="w-12 h-12 text-twitter animate-spin" />
              </div>
            ) : (
              <PostButton
                disabled={!text.trim()}
                buttonText={"Post"}
                buttonType={"submit"}
              />
            )}
          </div>
        </div>
      </div>
      <div className="border-b border-slate-800 "></div>
    </form>
  );
};

// <form action={formAction}>
//   <div className="flex pt-3 ">
//     <div className="w-14 h-12 relative mx-2">
//       <Image
//         src={userImage!}
//         alt="user profile image"
//         fill
//         className="rounded-full"
//       />
//     </div>
//     <UploadPost
//       value={tweetTexts}
//       onChange={handleTweetTxtChange}
//       disabled={!tweetTexts.trim()}
//       buttonText="Post"
//       buttonType="submit"
//       placeholder="What's happening?!"
//       autoFocus={false}
//     />
//   </div>
//   <div className="border-b border-slate-800 "></div>
// </form>

export default TweetsForm;
