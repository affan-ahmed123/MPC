/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pakwan: {
          dark: '#0d0f14',
          card: '#151922',
          surface: '#1c222e',
          border: '#2a3245',
          gold: '#e6b343',
          goldLight: '#fbe29d',
          goldDark: '#b88219',
          amber: '#f59e0b',
          saffron: '#ea580c',
          ruby: '#e11d48',
          emerald: '#10b981',
          whatsapp: '#25D366'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        urdu: ['"Noto Nastaliq Urdu"', '"Amiri"', 'sans-serif'],
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #e6b343 0%, #ffd875 50%, #b88219 100%)',
        'royal-dark': 'linear-gradient(180deg, #0d0f14 0%, #151922 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(230, 179, 67, 0.3)',
        'gold-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 15px rgba(230, 179, 67, 0.1)',
      }
    },
  },
  plugins: [],
}

