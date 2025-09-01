"use client"
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./ui/button";

 // Marks this file for client-side rendering (requiered for hooks like useState)

// Define the props for the CopyEventButton component
interface CopyEventButtonProps 
  extends Omit<React.ComponentProps<"button">, "children" | "onClick">, // Inherit all native button props except children & onClick
    VariantProps<typeof buttonVariants> { // Allow variant and size props from button styling
      eventId: string // Requiered: event ID for the hooking link
      clerkUserId: string // Requiered: user ID for the booking link
    }


// Reusable button component that copies a URL to clipboard
export function CopyEventButton({
  eventId,
  clerkUserId,
  className,
  variant,
  size,
  ...props // Any other button props like disabled, type, etc.
} : CopyEventButtonProps) {

  return (
    <Button
      onClick={handleCopy}
      className={cn(buttonVariants({variant, size}), 'cursor-pointer', className)} // Apply variant/size classes + any custom classes
      variant={variant}
      size={size}
      {...props}
    >
      <CopyIcon className="size-4 mr-2" /> {/* Icon that changes with copy state */}
      {getCopyLabel(copyState)} {/* Text label that changes with copy state */}
    </Button>
  )
}