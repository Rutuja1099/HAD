/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'doctor-background': "url('/src/assets/DoctorAnime.png')"
      }
    },
  },
  plugins: [],
}

