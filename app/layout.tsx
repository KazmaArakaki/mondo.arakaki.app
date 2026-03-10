import "./globals.css";

import type { Metadata } from "next";
import { M_PLUS_Rounded_1c } from "next/font/google";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "mondo",
};

const font = M_PLUS_Rounded_1c({
  weight: [
    "300", "500", "800",
  ],
  preload: false,
});

export default async function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={cn(font.className)}>
        <div className="flex flex-col h-dvh w-full max-w-md bg-linear-to-r from-app-lavender to-app-light-pink overflow-x-hidden">
          <div className="flex-1 w-full overflow-y-auto">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
