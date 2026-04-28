/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: { 300:'#f5e06a', 400:'#f0d060', 500:'#d4af37', 600:'#b8960c', 700:'#9a7d0a' },
        dark: { 900:'#080808', 800:'#0d0d0d', 700:'#111111', 600:'#1a1a1a', 500:'#222222' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
