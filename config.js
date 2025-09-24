// config.js
// Configuración centralizada para la conexión con Supabase

const Config = {
  // Configuración de Supabase
  getSupabaseConfig() {
    return {
      // URL de tu proyecto Supabase
      url: "https://fhequkvqxsbdkmgmoftp.supabase.co",
      // Clave anónima (pública) de tu proyecto Supabase
      key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZXF1a3ZxeHNiZGttZ21vZnRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5MTM3NzAsImV4cCI6MjA2OTQ4OTc3MH0.tVXmyBG39oxWJVlmFwHXAaYDBWxakssZ7g-BywmlZEM"
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