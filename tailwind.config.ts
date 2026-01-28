import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'discord-dark': '#23272A',
        'discord-dark-light': '#2C2F33',
        'discord-gray': '#99AAB5',
        'discord-blurple': '#5865F2',
        'discord-green': '#3BA55D',
        'discord-red': '#ED4245',
      },
    },
  },
  plugins: [],
} satisfies Config;
