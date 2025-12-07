import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm Cream & Neutral Base
        cream: {
          50: '#fefdfb',
          100: '#fef9f5',
          200: '#fef3eb',
          300: '#fde8d7',
          400: '#fbdcc3',
          500: '#f9d0af',
          600: '#f7c49b',
          700: '#f5b887',
        },
        // Warm Stone/Gray for text
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Warm Terracotta (Primary warm color) - Warmer tones
        warm: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Soft Coral/Pink (Energy) - Warmer, friendlier
        energy: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        // Warm Amber/Gold - More golden, warmer
        sunshine: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Sage Green (for balance)
        sage: {
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#c7d2c8',
          300: '#a3b4a5',
          400: '#7d9580',
          500: '#5f7a62',
          600: '#4a604d',
          700: '#3d4f40',
          800: '#334135',
          900: '#2b362d',
        },
        // Safety Green (warm, friendly green) - Warmer, more inviting
        safety: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-warm': 'linear-gradient(135deg, #fef6ee 0%, #fff5f7 100%)',
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 20px -4px rgba(251, 113, 37, 0.1), 0 10px 30px -3px rgba(251, 113, 37, 0.05)',
        'soft-lg': '0 10px 40px -8px rgba(251, 113, 37, 0.15), 0 20px 50px -5px rgba(251, 113, 37, 0.08)',
        'glass': '0 8px 32px 0 rgba(251, 113, 37, 0.1)',
        'warm': '0 4px 24px -2px rgba(242, 113, 37, 0.12)',
        'warm-lg': '0 8px 32px -4px rgba(242, 113, 37, 0.18), 0 16px 48px -6px rgba(242, 113, 37, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config


