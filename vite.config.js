import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server:{
host:true,
preview:{
  allowedHosts:["https://x-clone-frontend-5bpx.onrender.com"]
}
  },
  plugins: [
    tailwindcss(),    
    react()],

})
