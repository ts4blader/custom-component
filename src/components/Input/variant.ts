import { cva } from "class-variance-authority"

export const wrapperVariant = cva(
  ["input-wrapper", "inline-flex items-center rounded-lg overflow-hidden"],
  {
    variants: {
      theme: {
        default:
          "border border-solid border-slate-300 focus-within:ring-2 focus-within:ring-blue-300 focus-within:ring-offset-1 text-slate-800",
      },

      size: {
        sm: "h-8 text-sm",
        md: "h-9 text-sm",
        lg: "h-10",
      },
    },

    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)

export const addonVariant = cva(
  ["input-addon", "inline-flex items-center self-stretch"],
  {
    variants: {
      side: {
        left: "order-1 rounded-l-lg",
        right: "order-3 rounded-r-lg",
      },

      theme: {
        default: "bg-slate-100",
      },

      type: {
        none: "",
        seemless: "bg-transparent",
        border: "",
      },

      size: {
        sm: "px-3",
        md: "px-3",
        lg: "px-4",
      },
    },

    compoundVariants: [
      {
        type: "seemless",
        side: "left",
        className: "pr-0",
      },

      {
        type: "seemless",
        side: "right",
        className: "pl-0",
      },

      {
        type: "border",
        side: "left",
        className: "border-r border-r-slate-300",
      },

      {
        type: "border",
        side: "right",
        className: "border-l border-l-slate-300",
      },
    ],

    defaultVariants: {
      theme: "default",
      size: "md",
      side: "left",
      type: "none",
    },
  }
)

export const inputVariant = cva(
  [
    "input-inner",
    "grow bg-transparent file:border-0 file:mr-2 file:rounded-md file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none disabled:cursor-not-allowed order-2",
  ],
  {
    variants: {
      theme: {
        default: "file:bg-slate-200",
      },

      size: {
        sm: "mx-3",
        md: "mx-3",
        lg: "mx-4",
      },
    },
    defaultVariants: {
      theme: "default",
      size: "md",
    },
  }
)
