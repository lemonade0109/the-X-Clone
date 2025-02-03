import React from "react";

export type UploadProps = {
  placeholder: string;
  autoFocus: boolean;
  buttonText: string;
  buttonType: "submit" | "reset" | "button";
  value: string;
  disabled?: boolean;
  imgName?: string;
  name?: "text";
  buttonClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick?: () => void;
};

export type TooltipContainerProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  disabled?: boolean;
};
