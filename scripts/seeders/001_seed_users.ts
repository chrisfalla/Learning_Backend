import pool from '../../src/database/test/connection';
import bcrypt from 'bcryptjs';

export const seed = async () => {
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await client.query(`
      INSERT INTO users (email, password, name)
      VALUES 
        ('user1@example.com', $1, 'Usuario Uno'),
        ('user2@example.com', $1, 'Usuario Dos'),
        ('admin@example.com', $1, 'Administrador')
      ON CONFLICT (email) DO NOTHING;
    `, [hashedPassword]);

    console.log('✅ Usuarios creados');
  } finally {
    client.release();
  }
};
