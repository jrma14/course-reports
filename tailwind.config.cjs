/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ac2b37",
          secondary: "#f6d860",
          accent: "#37cdbe",
          neutral: "#ECF0F1",
          "base-100": "#ECF0F1",
          success: "#94FA92",
          error: "#FF6961",
          warning: "#FFFF7A",
        },
      },
      'light',
      'dark',
    ],
  },
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
