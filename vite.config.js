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
        turno: resolve(__dirname, 'turno.html'),
        panel: resolve(__dirname, 'panel.html'),
        negocio: resolve(__dirname, 'negocio.html'),
        configuracion: resolve(__dirname, 'configuracion.html'),
        login: resolve(__dirname, 'login.html'),
        cierre: resolve(__dirname, 'cierre.html'),
        usuario: resolve(__dirname, 'usuario.html'),
      },
    },
  },
});