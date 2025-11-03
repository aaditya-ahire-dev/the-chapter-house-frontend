/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Scans all files in the app directory
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Scans traditional pages directory (for compatibility)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans common component directories
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Scans common src directory
    "./index.html", // Scans the root HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}