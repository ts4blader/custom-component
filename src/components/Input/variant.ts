import { cva } from "class-variance-authority"

export const wrapperVariant = cva(
  [
    "input-wrapper",
    "inline-flex items-center rounded-lg",
    "focus-within:ring-2 focus-within:ring-offset-1",
  ],
  {
    variants: {
      variant: {
        default:
          "border border-solid border-slate-300 focus-within:ring-accent text-slate-800",
      },

      size: {
        sm: "h-8 text-sm space-x-3",
        md: "h-9 text-sm space-x-4",
        lg: "h-10 space-x-4",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export const addonVariant = cva(["input-addon"], {
  variants: {
    side: {
      left: "order-1",
      right: "order-3",
    },
  },

  defaultVariants: {
    side: "left",
  },
})

export const inputVariant = cva(
  [
    "input-inner",
    "grow bg-transparent file:border-0 file:mr-2 file:rounded-md file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed order-2",
  ],
  {
    variants: {
      variant: {
        default: "file:bg-slate-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
