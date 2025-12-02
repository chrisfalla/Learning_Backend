import pool from '../src/database/test/connection';

// Importar todos los seeders en orden
import * as seeder001 from './seeders/001_seed_users';
import * as seeder002 from './seeders/002_seed_posts';

const seeders = [
  { name: '001_seed_users', ...seeder001 },
  { name: '002_seed_posts', ...seeder002 },
];

const runSeeders = async () => {
  console.log('🌱 Ejecutando seeders...\n');
  
  try {
    for (const seeder of seeders) {
      console.log(`📝 Ejecutando: ${seeder.name}`);
      await seeder.seed();
    }
    
    console.log('\n🎉 Todos los seeders ejecutados exitosamente');
  } catch (error) {
    console.error('\n❌ Error ejecutando seeders:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

runSeeders();
