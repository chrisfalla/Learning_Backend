import pool from '../test/connection';
import * as migration001 from '../migrations/001_create_users_table';
import * as migration002 from '../migrations/002_create_posts_table';

const migrations = [
  { name: '001_create_users_table', ...migration001 },
  { name: '002_create_posts_table', ...migration002 },
];

export const runMigrations = async () => {
  console.log('🚀 Ejecutando migraciones...\n');
  
  try {
    for (const migration of migrations) {
      console.log(`📝 Ejecutando: ${migration.name}`);
      await migration.up();
    }
    
    console.log('\n🎉 Todas las migraciones ejecutadas exitosamente');
  } catch (error) {
    console.error('\n❌ Error ejecutando migraciones:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

runMigrations();
