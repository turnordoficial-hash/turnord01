// config.js
// Configuración centralizada para la conexión con Supabase

const Config = {
  // Configuración de Supabase
  getSupabaseConfig() {
    return {
      // URL de tu proyecto Supabase
      url: import.meta.env.SUPABASE_URL,
      // Clave anónima (pública) de tu proyecto Supabase
      key: import.meta.env.SUPABASE_ANON_KEY
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