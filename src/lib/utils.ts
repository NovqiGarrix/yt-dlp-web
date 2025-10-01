import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViews(views: string): string {
  const parsedViews = parseInt(views.replace(/,/g, ""), 10);
  if (isNaN(parsedViews)) return views;
  if (parsedViews < 1_000) return parsedViews.toString();
  if (parsedViews < 1_000_000) return `${(parsedViews / 1_000).toFixed(1)}K`;
  if (parsedViews < 1_000_000_000)
    return `${(parsedViews / 1_000_000).toFixed(1)}M`;
  return `${(parsedViews / 1_000_000_000).toFixed(1)}B`;
}
