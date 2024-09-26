/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceCustom: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10%)' }, // Adjust this to your desired percentage
        },
      },
      animation: {
        bounceCustom: 'bounceCustom 1s infinite', // Adjust duration as needed
      },
    },
  },
  plugins: [],
}
