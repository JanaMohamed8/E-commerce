/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js" ],
  theme: {
    container:{
      center: true,
    },
    extend: {
      colors: {
      "main-color-light": "#007BFF",
        "bg-light": "#F8F9FA",
        "text-light":"#212529",
        "main-color-dark": "#1E88E5", 
        "bg-dark": "#121212",         
        "text-dark": "#EAEAEA" 
    
      },
    
     
    },
  },
  plugins: [ require('flowbite/plugin')],
  darkMode: 'selector',
}

// "main-color-light": "#007BFF",;
// "bg-light": "#F8F9FA",;
// "text-light":"#212529",;
// "main-color-dark": "#1E88E5",;
// "bg-dark": "#121212",;
// "text-dark": "#EAEAEA";

// "main-color-light": "#FF5722",
//         "bg-light": "#FFFFFF",
//         "text-light":"#2F2F2F",
//         "main-color-dark": "#FF7043", 
//         "bg-dark": "#181818",         
//         "text-dark": "#EAEAEA" 