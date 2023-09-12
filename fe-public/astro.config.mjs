import { defineConfig } from 'astro/config';
import { astroImageTools } from "astro-imagetools"; // <-- add this

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(),
                 astroImageTools]
});
