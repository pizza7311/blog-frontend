module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      typography:theme=>({
        DEFAULT: {
          css: {
            "pre code::before": {
              "padding-left": "unset"
            },
            "pre code::after": {
              "padding-right": "unset"
            },
            code: {
              backgroundColor: '#edf0f5',
              color: "black",
              fontWeight: "600",
              "border-radius": "0.25rem"
            },
            "code::before": {
              content:'"`"',
              "padding-left": "0.25rem"
            },
            "code::after": {
              content:'"`"',
              "padding-right": "0.25rem"
            }
          }
        }
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
