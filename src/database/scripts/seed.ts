import pool from '../test/connection';
import * as seed001 from '../seeds/001_users_seed';
import * as seed002 from '../seeds/002_posts_seed';

const seeds = [
  { name: '001_users_seed', ...seed001 },
  { name: '002_posts_seed', ...seed002 },
];

export const runSeeds = async () => {
  console.log('🌱 Ejecutando seeds...\n');
  
  try {
    for (const seedFile of seeds) {
      console.log(`📝 Ejecutando: ${seedFile.name}`);
      await seedFile.seed();
    }
    
    console.log('\n🎉 Todos los seeds ejecutados exitosamente');
  } catch (error) {
    console.error('\n❌ Error ejecutando seeds:', error);
    throw error;
  } finally {
    await pool.end();
  }
};

runSeeds();
