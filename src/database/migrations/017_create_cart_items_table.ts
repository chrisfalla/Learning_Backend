import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS cart_items (
        id SERIAL PRIMARY KEY,
        cart_id INT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
        variant_id INT NOT NULL REFERENCES product_variants(id),
        quantity INT NOT NULL CHECK (quantity > 0),
        added_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Cart items table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS cart_items CASCADE');
    console.log('✅ Cart items table dropped');
  } finally {
    client.release();
  }
};
