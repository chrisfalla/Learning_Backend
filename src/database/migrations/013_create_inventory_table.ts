import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        variant_id INT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
        quantity INT NOT NULL DEFAULT 0,
        reserved_quantity INT DEFAULT 0,
        low_stock_threshold INT DEFAULT 5,
        location VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Inventory table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS inventory CASCADE');
    console.log('✅ Inventory table dropped');
  } finally {
    client.release();
  }
};
