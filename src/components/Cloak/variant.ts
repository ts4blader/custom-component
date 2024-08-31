import { cva } from "class-variance-authority"

export const cloakVariant = cva(["cloak"], {
  variants: {
    theme: {
      solid: "bg-[#f0f0f0]",
      soft: "bg-accent/10",
      ghost: "bg-transparent",
      outline: "text-accent border-[2px] border-current border-solid",
    },

    hover: { true: "cursor-pointer" },

    size: {
      sm: "px-4 py-2 rounded-md",
      md: "px-6 py-3 rounded-lg",
      lg: "px-8 py-4 rounded-xl",
    },
  },

  compoundVariants: [
    { hover: true, theme: "ghost", className: "hover:bg-accent/20" },
    { hover: true, theme: "soft", className: "hover:bg-accent/30" },
    { hover: true, theme: "outline", className: "hover:bg-accent/20" },
  ],

  defaultVariants: {
    theme: "solid",
    size: "md",
  },
})
