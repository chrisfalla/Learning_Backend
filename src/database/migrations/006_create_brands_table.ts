import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        logo_url VARCHAR(500),
        website VARCHAR(255),
        active BOOLEAN DEFAULT TRUE
      )
    `);
    console.log('✅ Brands table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS brands CASCADE');
    console.log('✅ Brands table dropped');
  } finally {
    client.release();
  }
};
