import { defineConfig } from 'vite'

export default defineConfig({
  base: "/trainer-sample/",
  build: {
    rollupOptions: {
      input: {
        index: new URL('./index.html', import.meta.url).pathname,
        404: new URL('./404.html', import.meta.url).pathname,
      },
    },
  },
})
