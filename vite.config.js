// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Configuración base
  base: './',
  
  // Resolución de rutas
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },

  // Prefijo de variables de entorno
  envPrefix: 'SUPABASE_',
  
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
    open: true,
  },
  
  // Configuración de build
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        turno: resolve(__dirname, 'turno_main.html'),
        panel: resolve(__dirname, 'panel_main.html'),
        negocio: resolve(__dirname, 'negocio_main.html'),
        configuracion: resolve(__dirname, 'configuracion.html'),
        login: resolve(__dirname, 'login_main.html'),
        cierre: resolve(__dirname, 'cierre_main.html'),
        usuario: resolve(__dirname, 'usuario_main.html'),
      },
    },
  },
});