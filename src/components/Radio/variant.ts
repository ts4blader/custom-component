import { cva } from "class-variance-authority"

export const radioVariant = cva(
  [
    "radio",
    "bg-white border-solid rounded-full relative inline-flex",
    "after:content after:hidden after:abs-center after:rounded-full",
    "peer-checked:after:block",
    "peer-focus-visible:ring-2",
  ],
  {
    variants: {
      variant: {
        default: [
          "ring-blue-300 ring-offset-2",
          "border-blue-300 border",
          "after:bg-blue-400",
        ],

        forest: [
          "ring-green-300 ring-offset-2",
          "border-green-300 border",
          "after:bg-green-400",
        ],
      },

      size: {
        sm: "w-4 h-4 after:w-2 after:h-2",
        md: "w-5 h-5 after:w-3 after:h-3",
        lg: "w-6 h-6 after:w-4 after:h-4",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)
