import { Billboard as BillboardType } from "@/types-db";
import React from "react";
import { cn } from "@/lib/utils";
import { Camera, Gamepad2, Quote, MapPin } from "lucide-react";

interface BillboardCardProps {
  data: BillboardType;
  index: number;
  className?: string; // Added this to fix the className error
}

const BillboardCard: React.FC<BillboardCardProps> = ({ data, index, className }) => {
  const icons = [<Camera key="c" />, <Gamepad2 key="g" />, <Quote key="q" />, <MapPin key="m" />];
  const icon = icons[index % icons.length];

  const isDark = index % 4 === 1;
  const isWhite = index % 4 === 2;

  return (
    <div className={cn(
      "relative rounded-[2.5rem] overflow-hidden min-h-[300px] flex flex-col justify-between p-8 shadow-sm transition-all hover:scale-[1.01]",
      isDark ? "bg-[#111] text-white" : isWhite ? "bg-white text-primary border border-primary/10" : "text-white",
      className // Applied the prop here
    )}>
      {!isDark && !isWhite && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.imageUrl})` }} />
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}

      <div className="relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center",
          isDark ? "bg-primary text-white" : isWhite ? "bg-neutral-100 text-neutral-400" : "bg-white/20 backdrop-blur-md"
        )}>
          {React.cloneElement(icon as React.ReactElement)}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className={cn(
          "text-3xl font-serif font-black leading-tight",
          isWhite ? "text-primary" : "text-white"
        )}>{data.label}</h3>
        <p className={cn(
          "text-sm mt-2 font-medium opacity-80",
          isWhite ? "text-neutral-500" : "text-white/80"
        )}>Handpicked premium selection for our menu.</p>
      </div>
    </div>
  );
};

export default BillboardCard;