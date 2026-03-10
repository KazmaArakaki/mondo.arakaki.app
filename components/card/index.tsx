import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
}: {
  children?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <div className={cn(
      "p-5 bg-white rounded-2xl drop-shadow-lg drop-shadow-app-blue/10",
      className,
    )}>
      {children}
    </div>
  );
}
