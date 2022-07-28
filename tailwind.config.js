/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'jira-blue': '#0052CC', // blue logo and link color
        'logo-fill-black': '#42526E', // black logo color
        whitish: '#fafbfc', // For background
      },
      boxShadow: {
        jira: 'rgb(0 0 0 / 10%) 0px 0px 10px',
      },
    },
  },
  plugins: [],
};
