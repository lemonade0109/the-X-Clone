import React from "react";

import PostButton from "./postButton";
import IconSelectors from "./iconSelectors";
import { IoCloseSharp } from "react-icons/io5";
import { UploadProps } from "@/utils/types";

const UploadPost = (props: UploadProps) => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const imagePickRef = React.useRef<HTMLInputElement>(null);
  const [imageFileUploading, setImageFileUploading] = React.useState(false);
  const [imageFileUrl, setImageFileUrl] = React.useState<string | null>(null);

  const name = "text";
  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFileUploading(true);
      setSelectedFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
    setImageFileUploading(false);
  };

  return (
    <div className=" flex flex-col w-full h-full  py-4 space-y-7 bg-black">
      <textarea
        value={props.value}
        onChange={props.onChange}
        autoFocus={props.autoFocus}
        placeholder={props.placeholder}
        className="w-full h-full text-start text-xl  pl-3 pt-6 mb-0 pb-0 border-none  outline-none tracking-wide bg-black placeholder:text-3xl"
        name={name}
      />

      {selectedFile && (
        <div className="px-4 py-2 relative">
          <img
            src={imageFileUrl!}
            alt="The image selected by the user"
            className={` object-cover w-full max-h-[250px] rounded-2xl  ${
              imageFileUploading ? "animate-pulse" : ""
            }`}
          />

          <div className="bg-black/80 absolute top-4 right-7 flex items-center justify-center rounded-full hover:bg-black/40 cursor-pointer w-10 h-10">
            <IoCloseSharp
              onClick={() => {
                setSelectedFile(null);
                setImageFileUploading(false);
                setImageFileUrl(null);
              }}
              className="w-8 h-8 text-white/70"
            />
          </div>
        </div>
      )}

      <div className="flex justify-between px-2 ">
        <IconSelectors
          addImageToPost={addImageToPost}
          imagePickRef={imagePickRef}
        />

        <PostButton
          onClick={props.onClick}
          disabled={props.disabled}
          buttonText={props.buttonText}
          buttonType={props.buttonType}
          className={props.buttonClassName}
        />
      </div>
    </div>
  );
};

export default UploadPost;
