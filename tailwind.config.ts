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
    extend: {
      colors: {
        // Primitive Colors - Grayscale
        gray: {
          50: 'var(--color-gray-50)',
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
          950: 'var(--color-gray-950)',
        },
        // Primitive Colors - Orangescale
        orange: {
          50: 'var(--color-orange-50)',
          100: 'var(--color-orange-100)',
          200: 'var(--color-orange-200)',
          300: 'var(--color-orange-300)',
          400: 'var(--color-orange-400)',
          500: 'var(--color-orange-500)',
          600: 'var(--color-orange-600)',
          700: 'var(--color-orange-700)',
          800: 'var(--color-orange-800)',
          900: 'var(--color-orange-900)',
        },
        // Semantic Colors - Brand
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
        white: 'var(--color-white)',

        // Semantic Colors - Status
        error: 'var(--color-error)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        positive: 'var(--color-positive)',

        // Semantic Colors - Text
        text: {
          normal: 'var(--color-normal)',
          alternative: 'var(--color-alternative)',
          assistive: 'var(--color-assistive)',
          disable: 'var(--color-disable)',
        },

        // Border Colors
        border: 'var(--color-border)',
        'border-alter': 'var(--color-border-alter)',
        'border-assist': 'var(--color-border-assist)',
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config
