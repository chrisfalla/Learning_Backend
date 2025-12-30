import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        variant_id INT NOT NULL REFERENCES product_variants(id),
        product_name VARCHAR(255) NOT NULL,
        attributes JSONB,
        quantity INT NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        total_price DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('✅ Order items table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS order_items CASCADE');
    console.log('✅ Order items table dropped');
  } finally {
    client.release();
  }
};
