import { cva } from "class-variance-authority";

const wrapper = cva('inline-flex items-center gap-4 rounded-md', {
  variants: {
    theme: {
      default: ['border', 'border-slate-300', 'focus-within:border-blue-400', 'focus-within:ring-2 focus-within:ring-blue-200']
    },
    size: {
      sm: ['h-6 px-2 py-1'],
      md: ['h-8 px-3 py-2'],
      lg: ['h-10 px-4 py-2'],
    },
  },
  defaultVariants: {
    size: 'md',
    theme: 'default'
  }
})

const addon = cva('flex-center', {
  variants: {
    theme: {
      default: ['border', 'border-slate-300', 'bg-blue-50']
    },
    size: {
      sm: ['h-6 px-2 py-1'],
      md: ['h-8 px-3 py-2'],
      lg: ['h-10 px-4 py-2'],
    },
    position: {
      start: ['rounded-s-md', 'border-r-0'],
      end: ['rounded-e-md', 'border-l-0'],
    }
  },
  defaultVariants: {
    size: 'md',
    theme: 'default',
    position: 'start'
  }
})

const input = cva('grow outline-none bg-transparent', {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-base'],
      lg: ['text-lg'],
    }
  },
  defaultVariants: {
    size: 'md',
  }
})

export { wrapper, input, addon }