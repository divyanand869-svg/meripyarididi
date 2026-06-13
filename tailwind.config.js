/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0F19',
          900: '#101826',
          800: '#111827',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6D5A8',
          deep: '#C8A95E',
        },
        paper: {
          100: '#FFFFFF',
          200: '#E5E7EB',
          300: '#CBD5E1',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sub: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(circle at 50% 30%, rgba(212,175,55,0.08), transparent 60%)',
      },
    },
  },
  plugins: [],
};
