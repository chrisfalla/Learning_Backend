import pool from '../test/connection';
import bcrypt from 'bcryptjs';

export const seed = async () => {
  const client = await pool.connect();
  try {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await client.query(`
      INSERT INTO users (email, password, name) VALUES
      ('juan@example.com', $1, 'Juan Pérez'),
      ('maria@example.com', $1, 'María García'),
      ('carlos@example.com', $1, 'Carlos López')
      ON CONFLICT (email) DO NOTHING;
    `, [hashedPassword]);
    
    console.log('✅ Usuarios insertados');
  } finally {
    client.release();
  }
};
