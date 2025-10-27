"use client";

import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

interface FilterContainerProps extends HTMLAttributes<HTMLDivElement> {
   children: React.ReactNode;
}

const FilterContainer: FC<FilterContainerProps> = ({
   children,
   className,
   ...props
}) => {
   return (
      <div {...props} className={cn(
         "flex flex-col gap-4",
         className
      )}>
         {children}
      </div>
   );
};

export default FilterContainer;
