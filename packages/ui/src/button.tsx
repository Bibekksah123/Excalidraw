"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant: "primary" | "secondary" | "outline";
  size?: "lg"| "sm";
  onclick:()=>void
}

export const Button = ({ children, className, onclick,size,variant }: ButtonProps) => {
  return (
    <button
      className={`${className}${variant=="primary"?"bg-blue-700":""} ${size=="lg"?"":""}`}
      onClick={onclick}
    >
      {children}
    </button>
  );
};
