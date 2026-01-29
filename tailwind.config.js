/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Blue palette
        ocean: {
          deep: '#0a1628',
          mid: '#1e3a5f',
          light: '#3e6b9b',
          surface: '#00d4ff',
        },
        // Automotive Metal Gray palette
        metal: {
          dark: '#1a1d21',
          mid: '#3d4449',
          light: '#6b7280',
          chrome: '#e5e7eb',
        },
        // Accent colors
        accent: {
          DEFAULT: '#00ff88',
          cyan: '#00d4ff',
          purple: '#9d4edd',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'wave': 'wave 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wave: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(180deg, #000428 0%, #004e92 50%, #009ffd 100%)',
        'gradient-tech': 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
