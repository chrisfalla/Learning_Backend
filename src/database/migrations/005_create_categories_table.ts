import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        parent_id INT REFERENCES categories(id),
        slug VARCHAR(100) UNIQUE NOT NULL,
        image_url VARCHAR(500),
        order_index INT DEFAULT 0,
        active BOOLEAN DEFAULT TRUE
      )
    `);
    console.log('✅ Categories table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS categories CASCADE');
    console.log('✅ Categories table dropped');
  } finally {
    client.release();
  }
};
