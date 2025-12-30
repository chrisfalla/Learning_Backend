import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_variants (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        sku VARCHAR(50) UNIQUE NOT NULL,
        price DECIMAL(10,2),
        compare_at_price DECIMAL(10,2),
        cost DECIMAL(10,2),
        weight DECIMAL(8,2),
        image_url VARCHAR(500),
        is_default BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('✅ Product variants table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS product_variants CASCADE');
    console.log('✅ Product variants table dropped');
  } finally {
    client.release();
  }
};
