import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DonationStatus, FoodCategory } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(date);
}

export function formatTimeWindow(start: Date, end: Date): string {
  const startTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(start);
  
  const endTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(end);
  
  return `${startTime} - ${endTime}`;
}

export function getStatusColor(status: DonationStatus): string {
  switch (status) {
    case 'available':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'in transit':
      return 'bg-yellow-100 text-yellow-800';
    case 'delivered':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getCategoryIcon(category: FoodCategory): string {
  switch (category) {
    case 'produce':
      return '🥦';
    case 'bakery':
      return '🍞';
    case 'dairy':
      return '🥛';
    case 'meat':
      return '🥩';
    case 'prepared':
      return '🍲';
    case 'canned':
      return '🥫';
    case 'dry goods':
      return '🌾';
    case 'frozen':
      return '❄️';
    case 'beverages':
      return '🥤';
    default:
      return '📦';
  }
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
}
