import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEventWithin24Hours(event: string | null): boolean {
  if (event) {
    const eventTimestamp = new Date(event).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - eventTimestamp;

    // Check if the event is within the last 24 hours (24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    return timeDifference <= 24 * 60 * 60 * 1000;
  }

  return false;
}