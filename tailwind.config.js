/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        closeModal: {
          '0%' : {
            visibility: 'visible'
          },
          '100%' : {
            visibility: 'hidden'
          }
        },
        fade: {
          '0%': {
            transform: 'translateY(-1.4em)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        },
        help: {
          '0%, 4%': {
            opacity: 0
          },
          '5%, 100%': {
            opacity: 1
          }
        }
      },
      animation: {
        fade: 'fade 0.2s',
        help: 'help 80s',
        alert: 'help 0.2s',
        closeModal: 'closeModal 0s forwards 0.15s'
      }
    },
  },
  plugins: [],
};
