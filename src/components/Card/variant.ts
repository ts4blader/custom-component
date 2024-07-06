import { cva } from "class-variance-authority"

export const cardVariant = cva(["card"], {
  variants: {
    theme: {
      default: "",
    },

    size: {
      sm: "rounded-sm px-4 py-2",
      md: "rounded-md px-6 py-3",
      lg: "rounded-lg px-8 py-4",
    },
  },
  defaultVariants: {
    theme: "default",
    size: "md",
  },
})
