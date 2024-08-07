import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        hmaroon: '#48100E',
        hgold: '#FDB81D',
        hyellow: '#FFF8E8',
        hgray: '#F9FAFB',
        htext: '#374151'
      },
      fontFamily: {
        primary: ['Roboto Condensed'],
        secondary: ['Roboto', 'sans-serif']
      }
    }
  },
  plugins: [typography, forms, aspectRatio]
};
