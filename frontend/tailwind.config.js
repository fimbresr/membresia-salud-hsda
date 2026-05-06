/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        avenirBlack: ['"Avenir Black"', 'sans-serif'],
        avenirMedium: ['"Avenir Medium"', 'sans-serif'],
        avenirLight: ['"Avenir Light"', 'sans-serif'],
      },
      colors: {
        hospital: {
          primary: '#004a8f', // Azul corporativo estimado, ajustable tras analizar logo.png
          secondary: '#00a3e0',
          accent: '#e31b23',
          background: '#f8fafc',
          dark: '#1e293b'
        },
      },
      backgroundImage: {
        'membership-gradient': 'linear-gradient(135deg, #004a8f 0%, #00a3e0 100%)',
      }
    },
  },
  plugins: [],
}
