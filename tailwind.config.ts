// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'IBM Plex Sans KR', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
      colors: {
        bg: {
          primary: '#080c14',
          secondary: '#0d1421',
          card: '#111827',
        },
        border: {
          DEFAULT: '#1e2d45',
          bright: '#2a4066',
        },
      },
    },
  },
  plugins: [],
};

export default config;
