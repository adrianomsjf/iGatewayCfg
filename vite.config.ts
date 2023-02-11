import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

   // add this: Para acessar rede local
   server: { 
   host: '0.0.0.0'
   } 
})
