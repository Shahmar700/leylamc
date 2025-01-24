/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "primary": '#6bb52b',
        "secondary": '#F3F3F3',
        "main-text": "#505050"
      },
      scale: {
        '1005': '1.005',
        '101': '1.01',
        '102': '1.02',
      }
    },
    fontFamily: {
      sans: ['AvantGarde', 'sans-serif'],
    },
    container: {
      padding: '1rem',
      center: true,
    },
    screens: {
      sm: "640px",
      md:"768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      'screen-500': '500px',
    },
  },
  plugins: [],
}

