import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_attributes (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        display_name VARCHAR(100) NOT NULL,
        type VARCHAR(20) DEFAULT 'text'
      )
    `);
    console.log('✅ Product attributes table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS product_attributes CASCADE');
    console.log('✅ Product attributes table dropped');
  } finally {
    client.release();
  }
};
