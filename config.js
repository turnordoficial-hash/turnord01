// config.js
// Configuración centralizada para la conexión con Supabase

const Config = {
  // Configuración de Supabase
  getSupabaseConfig() {
    return {
      // URL de tu proyecto Supabase
      url: 'https://tu-proyecto.supabase.co',
      // Clave anónima (pública) de tu proyecto Supabase
      key: 'tu-clave-publica-de-supabase'
    };
  },

  // Otras configuraciones globales pueden ir aquí
  getAppConfig() {
    return {
      appName: 'TurnoRD',
      version: '1.0.0'
    };
  }
};

export default Config;