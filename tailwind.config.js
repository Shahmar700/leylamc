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
      center: true,
      padding: {
        DEFAULT: '0.5rem',    // Kiçik ekranlar üçün default dəyər (768px-dən kiçik)
        md: '0.5rem',           // 768px və daha böyük ekranlar üçün
        lg: '1rem',           // 1024px və daha böyük
        xl: '1rem',           // 1280px və daha böyük
        '2xl': '1rem',        // 1536px və daha böyük
      },
    },
    screens: {
      sm: "640px",
      md:"768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      'screen-500': '500px',
      'screen-400': '400px',
      'screen-375': '375px',
    },
  },
  plugins: [],
}

