import { cva } from "class-variance-authority"

export const wrapperVariant = cva([
  "checkbox-wrapper",
  "relative inline-flex items-center leading-[1]",
  "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
])

export const inputVariant = cva([
  "checkbox-input",
  "absolute top-0 left-0 w-0 h-0 opacity-0 peer",
])

export const iconVariant = cva(["checkbox-icon", "abs-center text-white"], {
  variants: {
    size: {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
    },
  },

  defaultVariants: {
    size: "md",
  },
})

export const boxVariant = cva(
  [
    "checkbox-box",
    "bg-white border-solid rounded-md relative",
    "peer-focus-visible:ring-2",
  ],
  {
    variants: {
      theme: {
        default: [
          "ring-blue-300 ring-offset-2",
          "border-blue-300 border",
          "peer-checked:bg-blue-300",
        ],

        forest: [
          "ring-green-300 ring-offset-2",
          "border-green-300 border",
          "peer-checked:bg-green-300",
        ],
      },

      size: {
        sm: "w-4 h-4 mr-2",
        md: "w-5 h-5 mr-2",
        lg: "w-6 h-6 mr-3",
      },
    },

    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)
