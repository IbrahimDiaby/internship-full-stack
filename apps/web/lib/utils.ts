import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge className inputs using clsx, then apply tailwind-merge to deduplicate/conflict-resolve.
 * Works with strings, arrays, objects — whatever `clsx` accepts.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(...inputs));
}

export default cn;
