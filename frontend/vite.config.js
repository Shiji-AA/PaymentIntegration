// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server:{
//     host: 'localhost',
//     port: 4000
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 4000
  },
  build: {
    outDir: 'dist', // default is fine unless you changed it
  },
 
})
