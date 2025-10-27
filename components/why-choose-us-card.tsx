"use client";

import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="border bg-card text-card-foreground shadow-lg rounded-md border-none p-4 py-12 flex flex-col items-center justify-center gap-4">
      <CardContent className="flex flex-col items-center justify-center gap-4">
        {icon}
        <h3 className="text-2xl font-semibold leading-none tracking-tight text-neutral-600">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
