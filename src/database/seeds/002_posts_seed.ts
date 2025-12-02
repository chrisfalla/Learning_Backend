import pool from '../test/connection';

export const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      INSERT INTO posts (title, content, user_id) VALUES
      ('Mi primer post', 'Este es el contenido de mi primer post', 1),
      ('Aprendiendo TypeScript', 'TypeScript es genial para desarrollo backend', 1),
      ('PostgreSQL y Supabase', 'Supabase hace que PostgreSQL sea muy fácil de usar', 2),
      ('Express.js Tips', 'Algunos consejos útiles para Express', 3)
      ON CONFLICT DO NOTHING;
    `);
    
    console.log('✅ Posts insertados');
  } finally {
    client.release();
  }
};
