"use client";

import React from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../../ui/tooltip";

const ImagePicker = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const imagePickRef = React.useRef<HTMLInputElement>(null);
  const [imageFileUploading, setImageFileUploading] = React.useState(false);
  const [imageFileUrl, setImageFileUrl] = React.useState<string | null>(null);

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
    <React.Fragment>
      {selectedFile && (
        <img
          onClick={() => {
            setSelectedFile(null);
            setImageFileUploading(false);
            setImageFileUrl(null);
          }}
          src={imageFileUrl!}
          alt="The image selected by the user"
          className={`object-cover w-full max-h[250px] cursor-pointer hover:brightness-95 rounded-xl p-4 ${
            imageFileUploading ? "animate-pulse" : ""
          }`}
        />
      )}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="group">
            <div className="w-11 h-11 flex items-center justify-center group-hover:bg-twitter/15 rounded-full">
              <HiOutlinePhotograph
                onClick={() => imagePickRef.current?.click()}
                className="h-10 w-10 p-2 text-sky-500 group-hover:text-twitter rounded-full cursor-pointer"
              />
              <input
                type="file"
                ref={imagePickRef}
                onChange={addImageToPost}
                accept="image/*"
                name="image"
                hidden
              />
            </div>
          </TooltipTrigger>

          <TooltipContent
            side="bottom"
            className="rounded-sm bg-twitter/20 text-white/70 tracking-normal text-sm px-1 py-0"
          >
            <p>media</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </React.Fragment>
  );
};

export default ImagePicker;
