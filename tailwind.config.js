/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}", 
    "./public/*.{html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        Dark: "#2A254B",
        Primary: "#4E4D93",
        Light: "#FFFFFF",
        DarkPrimary: "#2A254B",
        LightGrey: "#F9F9F9",
        BorderGrey: "#EBE8F4",
        BorderDark: "#CAC6DA",
        Gray: "#6B7280",
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Open_Sans: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        Headline_one: ['36px', {
          fontWeight: '500',
          lineHeight: '150%'
        }],
        Headline_two: ['32px', {
          fontWeight: '500',
          lineHeight: '150%'
        }],
        Headline_three: ['24px', {
          fontWeight: '500',
          lineHeight: '150%'
        }],
        Headline_four: ['20px', {
          fontWeight: '500',
          lineHeight: '150%'
        }],
        Headline_five: ['16px', {
          fontWeight: '500',
          lineHeight: '150%'
        }],
        Headline_six: ['14px', {
          fontWeight: '500',
          lineHeight: '150%'
        }],
        Body_small: ['16px', {
          fontWeight: '400',
          lineHeight: '150%'
        }],
        Body_medium: ['20px', {
          fontWeight: '400',
          lineHeight: '150%'
        }],
        Body_large: ['24px', {
          fontWeight: '400',
          lineHeight: '150%'
        }]
      },
      width: {
        'product-detail': '900px',
        'product-image': '300px',
        'detail-image': '600px',
        'nav-icon': '60px',
      },
      minWidth: {
        'product-image': '300px',
      },
      minHeight: {
        'product-image': '300px',
      },
      height: {
        'navbar': '66px',
        'product-image': '200px',
        'detail-image': '600px',
        'feature-block': '468px',
      }
    },
  },
  plugins: [],
}

