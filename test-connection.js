// test-connection.js
// Script para probar la conexión con Supabase

import { supabase, testConnection } from './database.js';

// Función principal para probar la conexión
async function runTest() {
  console.log('Iniciando prueba de conexión con Supabase...');
  
  try {
    // Verificar si el cliente de Supabase se inicializó correctamente
    console.log('Cliente Supabase:', supabase ? 'Inicializado' : 'No inicializado');
    
    // Probar la conexión usando la función de testConnection
    console.log('Probando conexión...');
    const isConnected = await testConnection();
    console.log('Resultado de la prueba de conexión:', isConnected ? 'Exitosa' : 'Fallida');
    
    // Intentar obtener la sesión actual
    console.log('Probando autenticación...');
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('Error al obtener sesión:', sessionError);
    } else {
      console.log('Sesión:', session ? 'Activa' : 'No hay sesión activa');
    }
    
    // Intentar hacer una consulta simple a la tabla configuracion_negocio
    console.log('Probando consulta a configuracion_negocio...');
    const { data: configData, error: configError } = await supabase
      .from('configuracion_negocio')
      .select('*')
      .limit(1);
    
    if (configError) {
      console.error('Error al consultar configuracion_negocio:', configError);
    } else {
      console.log('Datos obtenidos:', configData);
    }
    
  } catch (err) {
    console.error('Error inesperado durante la prueba:', err);
  }
}

// Ejecutar la prueba
runTest();

// Exportar por defecto para que funcione como módulo ES
export default {};