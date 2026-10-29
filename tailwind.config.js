/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          DEFAULT: '#A9DCE8',
          soft: '#EAF7F8',
          50: '#F2FAFC',
          100: '#EAF7F8',
          200: '#D5F0F5',
          300: '#BFE7F0',
          400: '#A9DCE8',
          500: '#7ECBE0',
          600: '#4AB4D1',
          700: '#2E8FA9',
        },
        navy: {
          DEFAULT: '#153B58',
          light: '#235073',
          dark: '#0E273A',
          deep: '#091C2B',
        },
        cream: {
          DEFAULT: '#FFF9F0',
          light: '#FFFCF7',
          warm: '#FBF3E6',
          border: '#F2E8D8',
        },
        coral: {
          DEFAULT: '#F29A83',
          light: '#FDEEE9',
          dark: '#E27E64',
        },
        mint: {
          DEFAULT: '#BFE3D1',
          light: '#EDF8F2',
          dark: '#93CBB0',
        },
        body: '#3F4B53',
        muted: '#77838A',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', 'sans-serif'],
        sans: ['Inter', '"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(21, 59, 88, 0.06)',
        'soft-lg': '0 14px 40px rgba(21, 59, 88, 0.09)',
        'card': '0 4px 20px -2px rgba(21, 59, 88, 0.05)',
        'floating': '0 20px 48px -10px rgba(21, 59, 88, 0.12)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.7' },
          '50%': { transform: 'translateY(-10px) scaleX(1.1)', opacity: '0.9' },
          '100%': { transform: 'translateY(-20px) scaleX(1)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        steam: 'steam 3s ease-out infinite',
        marquee: 'marquee 25s linear infinite',
      }
    },
  },
  plugins: [],
}
