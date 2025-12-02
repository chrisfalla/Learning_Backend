import pool from '../../src/database/test/connection';

export const seed = async () => {
  const client = await pool.connect();
  try {
    // Obtener IDs de usuarios
    const usersResult = await client.query('SELECT id FROM users LIMIT 2');
    
    if (usersResult.rows.length < 2) {
      console.log('⚠️  No hay suficientes usuarios para crear posts');
      return;
    }

    await client.query(`
      INSERT INTO posts (title, content, user_id)
      VALUES 
        ('Primer Post', 'Este es el contenido del primer post', $1),
        ('Segundo Post', 'Contenido del segundo post', $2),
        ('Post sobre TypeScript', 'TypeScript es genial para backend', $1)
      ON CONFLICT DO NOTHING;
    `, [usersResult.rows[0].id, usersResult.rows[1].id]);

    console.log('✅ Posts creados');
  } finally {
    client.release();
  }
};
