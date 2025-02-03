import React from "react";
import { Button } from "./button";

export type PostButtonProps = {
  disabled?: boolean;
  buttonText?: "Post" | string;
  buttonType: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
};

const PostButton = (props: PostButtonProps) => {
  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.buttonType}
      className=" font-bold rounded-full  px-6 py-6 text-black text-lg"
    >
      {props.buttonText}
    </Button>
  );
};

export default PostButton;
