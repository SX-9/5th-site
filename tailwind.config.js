/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require("@catppuccin/tailwindcss")({
    defaultFlavour: 'mocha',
    prefix: 'ctp',
  })],
  theme: {
    extend: {
      backgroundImage: {
        '-gradient-6': 'linear-gradient(-6deg, var(--tw-gradient-stops))'
      },
      animation: {
        'scrolling-text-to-l': 'scroll 10s linear infinite',
        'scrolling-text-to-r': 'scroll 10s linear infinite reverse',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
};