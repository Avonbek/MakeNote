import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Note {
  id: string;
  title: string;
  content: string;
  topic: string;
  createdAt: string;
  updatedAt: string;
}
