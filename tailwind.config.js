/** @type {import('tailwindcss').Config} */
module.exports = {

    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],

    theme: {
        extend: {
            colors: {
                pesa: {
                    teal: "#006A5C",
                    dark: "#004D40",
                    inno:"#f6f3ec"
                }
            }
        }
    },
    plugins: []
};
