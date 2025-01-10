"use client";

import ImagePicker from "./ImagePicker";
import { createTweetAction } from "@/lib/actions/tweet/tweetActions";
import FormContainer from "../ui/FormContainer";

const TweetsForm = () => {
  return (
    <FormContainer action={createTweetAction}>
      <div className="flex pt-3 ">
        <div className="w-12 h-12 bg-gray-400 rounded-full mx-2"></div>

        <div className=" flex flex-col w-full h-full  py-4  bg-black">
          <input
            type="text"
            placeholder="What's happening?!"
            className="w-full h-full text-start text-xl  pl-3 pt-6 mb-0 pb-0 border-none  outline-none tracking-wide bg-black placeholder:text-3xl"
            name="tweet"
          />

          <ImagePicker />
        </div>
      </div>
      <div className="border-b border-slate-800 "></div>
    </FormContainer>
  );
};

export default TweetsForm;
