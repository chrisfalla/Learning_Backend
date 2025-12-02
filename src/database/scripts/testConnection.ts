import pool from '../test/connection';

const testConnection = async () => {
  console.log('🔍 Probando conexión a Supabase PostgreSQL...\n');
  
  try {
    const client = await pool.connect();
    console.log('✅ Conexión establecida exitosamente');
    
    const result = await client.query('SELECT NOW(), version()');
    console.log('📅 Fecha/Hora del servidor:', result.rows[0].now);
    console.log('🗄️  Versión de PostgreSQL:', result.rows[0].version);
    
    client.release();
    console.log('\n🎉 Test de conexión completado exitosamente');
  } catch (error) {
    console.error('\n❌ Error en la conexión:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

testConnection();
