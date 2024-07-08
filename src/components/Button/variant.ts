import { cva } from "class-variance-authority"

export const buttonVariant = cva(
  [
    "inline-flex items-center justify-center space-x-3",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:outline-none",
  ],
  {
    variants: {
      theme: {
        default: "bg-blue-500 text-white focus-visible:ring-blue-300",
        forest: "bg-green-500 text-white focus-visible:ring-green-300",
        ghost: "focus-visible:ring-blue-300",
      },

      size: {
        sm: "text-sm px-3 py-1 rounded-md h-8",
        md: "px-4 py-1.5 rounded-md h-9",
        lg: "text-lg px-4 py-2 rounded-lg h-10",
      },
    },

    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)
