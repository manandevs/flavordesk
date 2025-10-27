"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import Box from "../box";
import { cn } from "@/lib/utils";
import qs from "query-string";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface FilterGroupProps {
  label: string;
  options: string[];
  paramName: string;
}

const FilterGroup: FC<FilterGroupProps> = ({ label, options, paramName }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (option: string) => {
    const currentParams = Object.fromEntries(searchParams.entries());
    if (currentParams[paramName] === option) {
      delete currentParams[paramName];
    } else {
      currentParams[paramName] = option;
    }
    const url = qs.stringifyUrl({
      url: "/menu",
      query: currentParams,
    });
    router.push(url);
  };

  return (
    <Box className="flex-col items-start justify-start gap-3 pr-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value={label}>
          <AccordionTrigger className="flex items-center justify-between w-full py-2 hover:no-underline hover:bg-gray-50/75 px-2">
            <span className="text-lg font-semibold text-neutral-600">{label}</span>
          </AccordionTrigger>
          <AccordionContent className="mt-2">
            <Box className="flex flex-col gap-2 pl-4">
              {options.map((opt) => {
                const isActive = opt === searchParams.get(paramName);
                return (
                  <div
                    key={opt}
                    onClick={() => handleClick(opt)}
                    className={cn(
                      "w-full flex items-center justify-between text-sm font-semibold cursor-pointer px-2 py-1 rounded",
                      isActive ? "bg-[#84B74E]/75 text-neutral-600" : "text-neutral-500"
                    )}
                  >
                    <span>{opt}</span>
                    {isActive && <Check size={16} />}
                  </div>
                );
              })}
            </Box>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default FilterGroup;
