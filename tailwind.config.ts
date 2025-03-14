import type { Config } from 'tailwindcss'
import tailwindAnimate from 'tailwindcss-animate'

export default {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/stories/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '6.25rem',
      },
      screens: {
        DEFAULT: '69.5rem',
        lg: '80rem',
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config
