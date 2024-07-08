import { cva } from "class-variance-authority"

export const wrapperVariant = cva([
  "switch-wrapper",
  "inline-flex items-center leading-[1] relative",
  "aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:pointer-events-none",
])

export const trackVariant = cva(
  ["switch-track", "rounded-full relative transition-colors"],
  {
    variants: {
      theme: {
        default: "peer-checked:bg-blue-500 bg-slate-400",
        forest: "peer-checked:bg-green-500 bg-slate-400",
      },

      size: {
        sm: "w-10 h-6 mr-2 peer-checked:[&_.circle]:left-5",
        md: "w-12 h-7 mr-2 peer-checked:[&_.circle]:left-6",
        lg: "w-14 h-8 mr-3 peer-checked:[&_.circle]:left-7",
      },
    },

    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)

export const circleVariant = cva(
  [
    "circle",
    "rounded-full bg-white shadow-sm transition-[left]",
    "absolute top-1/2 -translate-y-1/2",
  ],
  {
    variants: {
      theme: {
        default: "",
        forest: "",
      },

      size: {
        sm: "w-4 h-4 left-1",
        md: "w-5 h-5 left-1",
        lg: "w-6 h-6 left-1",
      },
    },

    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)
