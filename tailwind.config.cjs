/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        'wpi-light': {
          'primary': "#ac2b37",
          'secondary': "#f6d860",
          'accent': "#37cdbe",
          'neutral': "#FFFFFF",
          'base-100': "#ECF0F1",
          'success': "#94FA92",
          'error': "#FF6961",
          'warning': "#FFFF7A",
        },
        'wpi-dark': {
          'primary': "#ac2b37",
          'secondary': "#f6d860",
          'accent': "#37cdbe",
          'neutral': "#34495E",
          'base-100': "#2C3E50",
          'success': "#94FA92",
          'error': "#FF6961",
          'warning': "#FFFF7A",
        },
      },
      // 'light',
      // 'dark',
    ],
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
