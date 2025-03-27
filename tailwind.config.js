/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [require("@catppuccin/tailwindcss")({
    defaultFlavour: 'mocha',
    prefix: 'ctp',
  })],
};