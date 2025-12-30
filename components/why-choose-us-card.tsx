"use client";

interface WhyChooseUsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function WhyChooseUsCard({
  title,
  description,
  icon,
}: WhyChooseUsCardProps) {
  return (
    <div className="bg-primary text-[#F4EFE9] rounded-[2rem] p-8 flex flex-col justify-center h-full shadow-sm relative overflow-hidden group">
      {/* Subtle hover effect background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
      
      <div className="relative z-10 flex flex-col items-start gap-4">
        <div className="p-3 bg-white/10 rounded-2xl w-fit">
            {icon}
        </div>
        <h3 className="text-2xl font-serif font-bold leading-tight">
          {title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}