import pool from '../test/connection';
import * as migration002 from '../migrations/002_create_posts_table';
import * as migration001 from '../migrations/001_create_users_table';

const migrations = [
  { name: '002_create_posts_table', ...migration002 },
  { name: '001_create_users_table', ...migration001 },
];

export const rollbackMigrations = async () => {
  console.log('🔄 Revirtiendo migraciones...\n');
  
  try {
    for (const migration of migrations) {
      console.log(`📝 Revirtiendo: ${migration.name}`);
      await migration.down();
    }
    
    console.log('\n🎉 Todas las migraciones revertidas exitosamente');
  } catch (error) {
    console.error('\n❌ Error revirtiendo migraciones:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

rollbackMigrations();
