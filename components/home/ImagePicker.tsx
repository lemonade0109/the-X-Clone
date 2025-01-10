"use client";

import React, { useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Button } from "../ui/button";

const ImagePicker = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  // const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  //
  const imagePickRef = useRef<HTMLInputElement>(null);

  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  return (
    <div className="">
      {selectedFile && (
        <div className="">
          <img
            src={selectedFile}
            alt="The image selected by the user"
            className=" object-cover w-full max-h[250px] cursor-pointer hover:brightness-95 rounded-xl p-4"
          />
        </div>
      )}

      <div className="flex items-center justify-between p-2.5  ">
        <HiOutlinePhotograph
          onClick={() => imagePickRef.current?.click()}
          className="h-10 w-10 p-2 text-sky-500 hover:text-sky-100 rounded-full cursor-pointer"
        />
        <input
          type="file"
          ref={imagePickRef}
          onChange={addImageToPost}
          accept="image/*"
          name="image"
          hidden
        />

        <Button
          type="submit"
          className=" font-bold rounded-full  px-6 py-6 text-black text-lg"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default ImagePicker;
