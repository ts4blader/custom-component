import { cva } from "class-variance-authority"

export const wrapperVariant = cva([
  "radio-wrapper",
  "relative inline-flex items-center leading-[1]",
  "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
])

export const inputVariant = cva([
  "radio-input",
  "absolute top-0 left-0 w-0 h-0 opacity-0 peer",
])

export const boxVariant = cva(
  [
    "radio-box",
    "bg-white border-solid rounded-full relative",
    "after:content after:hidden after:abs-center after:rounded-full",
    "peer-checked:after:block",
    "peer-focus-visible:ring-2",
  ],
  {
    variants: {
      theme: {
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
        sm: "w-4 h-4 mr-2 after:w-2 after:h-2",
        md: "w-5 h-5 mr-2 after:w-3 after:h-3",
        lg: "w-6 h-6 mr-3 after:w-4 after:h-4",
      },
    },

    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)
