import { cva } from "class-variance-authority"

export const buttonVariant = cva(
  [
    "inline-flex items-center justify-center space-x-3 font-semibold",
    "disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white",
    "focus-visible:ring-offset-2 focus-visible:ring-2 focus-visible:outline-none",
  ],
  {
    variants: {
      theme: {
        solid:
          "bg-accent text-white hover:bg-accent-400 focus-visible:ring-accent",
        soft: "bg-accent/50 text-white hover:bg-accent/60 focus-visible:ring-accent",
        ghost: "text-accent hover:bg-accent/20 focus-visible:ring-accent",
        outline:
          "text-accent border-[2px] border-current border-solid hover:bg-accent/20 focus-visible:ring-accent",
      },

      size: {
        sm: "text-sm px-3 py-1 rounded-md h-8",
        md: "px-4 py-1.5 rounded-md h-9",
        lg: "text-lg px-4 py-2 rounded-lg h-10",
      },
    },

    defaultVariants: {
      theme: "solid",
      size: "md",
    },
  }
)
