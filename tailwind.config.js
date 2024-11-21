/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#253D18',
          light: '#2F4B1F',
          dark: '#1B2C11'
        },
        secondary: {
          DEFAULT: '#A7C332',
          light: '#B8D143',
          dark: '#96B124'
        },
        nature: {
          sky: '#87CEEB',
          ocean: '#1E90FF',
          forest: '#228B22',
          earth: '#8B4513',
          sand: '#F4A460',
          leaf: '#66BB6A',
          cloud: '#F0F8FF',
          rain: '#4682B4'
        },
        impact: {
          health: '#FF5722',
          climate: '#00BCD4',
          social: '#9C27B0',
          economic: '#FFC107',
          water: '#03A9F4',
          air: '#81D4FA',
          energy: '#FFA000'
        },
        sdg: {
          green: '#56C02B',
          blue: '#00ADD8',
          orange: '#FD6925',
          purple: '#8F00FF'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'rain': 'rain 1s linear infinite',
        'cloud-float': 'cloud-float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        rain: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(10px)', opacity: 0 }
        },
        'cloud-float': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20px)' }
        }
      }
    },
  },
  plugins: [],
}