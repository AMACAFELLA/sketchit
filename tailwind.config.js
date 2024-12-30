/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sketch: ['Indie Flower', 'cursive'],
            },
            boxShadow: {
                'sketch': '2px 2px 4px rgba(0, 0, 0, 0.1), -1px -1px 4px rgba(0, 0, 0, 0.1)',
            },
            colors: {
                paper: '#f8f7f2',
                pencil: {
                    light: '#2B2B2B',
                    dark: '#1A1A1A',
                },
            },
        },
    },
    plugins: [],
}
