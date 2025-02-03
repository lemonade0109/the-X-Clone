import React from "react";
import { Button } from "./button";
import Link from "next/link";

const EmptyList = ({
  heading = "Something must be wrong.",
  message,
  //= "don't worry it's not your fault kindly reload!" ,
  btnText = "reload",
  href = "/home",
  children,
  className,
}: {
  heading?: string;
  message?: string;
  btnText?: string;
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`mt-4 ${className}`}>
      <h2 className="text-4xl font-extrabold">{heading}</h2>
      <p className="text-lg">{message}</p>
      {children}
      <Button asChild className="mt-4 capitalize" size="lg">
        <Link href={href}>{btnText}</Link>
      </Button>
    </div>
  );
};

export default EmptyList;
