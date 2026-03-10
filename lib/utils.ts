import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type PageProps = {
  params: Promise<Record<string, string | string[]>>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export type LayoutProps = {
  children: React.ReactNode;
  params: Promise<Record<string, string | string[]>>;
};
