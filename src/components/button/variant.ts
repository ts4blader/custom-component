import { cva } from "class-variance-authority";

export const wrapper = cva([
  'inline-flex items-center justify-center rounded-md focus:ring-4'
], {
  variants: {
    theme: {
      default: `text-white bg-blue-500 focus:ring-blue-200`,
      'default-borderred': `border text-blue-500 border-current focus:ring-blue-200`,

      danger: 'text-white bg-red-500 focus:ring-red-200',
      'danger-borderred': `border text-red-500 border-current focus:ring-red-200`,
    },
    size: {
      sm: 'h-6 text-xs px-3',
      md: 'h-7 text-sm px-4',
      lg: 'h-8 text-base px-5',
      xl: 'h-10 text-lg px-6',
    }
  },
  defaultVariants: {
    size: 'md',
    theme: 'default',
  }
})