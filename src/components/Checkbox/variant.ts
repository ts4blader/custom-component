import { cva } from "class-variance-authority"

export const checkboxVariants = cva(
  "rounded-md inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default:
          "border border-gray-400 bg-white text-transparent ring-offset-2 peer-checked:border-none peer-checked:bg-accent peer-checked:text-white peer-focus:ring-2 peer-focus:ring-accent/50",
      },

      size: {
        md: "w-5 h-5",
        sm: "w-4 h-4",
        lg: "w-6 h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
