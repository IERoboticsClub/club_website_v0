import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    theme: {
        colors:
        { 'navy_blue': { DEFAULT: '#000066', 100: '#000014', 200: '#000029', 300: '#00003d', 400: '#000052', 500: '#000066', 600: '#0000b8', 700: '#0a0aff', 800: '#5c5cff', 900: '#adadff' }, 'white': { DEFAULT: '#ffffff', 100: '#333333', 200: '#666666', 300: '#999999', 400: '#cccccc', 500: '#ffffff', 600: '#ffffff', 700: '#ffffff', 800: '#ffffff', 900: '#ffffff' }, 'deep_sky_blue': { DEFAULT: '#46beff', 100: '#002a41', 200: '#005583', 300: '#007fc4', 400: '#06a8ff', 500: '#46beff', 600: '#6cccff', 700: '#91d8ff', 800: '#b6e5ff', 900: '#daf2ff' }, 'raisin_black': { DEFAULT: '#202124', 100: '#060607', 200: '#0c0d0e', 300: '#131315', 400: '#191a1c', 500: '#202124', 600: '#494b52', 700: '#737681', 800: '#a1a4ac', 900: '#d0d1d5' }, 'kelly_green': { DEFAULT: '#6dc201', 100: '#162700', 200: '#2c4d00', 300: '#427401', 400: '#589a01', 500: '#6dc201', 600: '#91fe03', 700: '#adfe42', 800: '#c8fe81', 900: '#e4ffc0' } }
    }
});
