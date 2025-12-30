import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS auth_providers (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        provider VARCHAR(50) NOT NULL,
        provider_user_id VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        access_token TEXT,
        refresh_token TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE (provider, provider_user_id)
      )
    `);
    console.log('✅ Auth providers table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS auth_providers CASCADE');
    console.log('✅ Auth providers table dropped');
  } finally {
    client.release();
  }
};
