import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Box: FC<BoxProps> = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "mx-auto w-full flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;
