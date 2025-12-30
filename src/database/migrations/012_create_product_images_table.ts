import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS product_images (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        variant_id INT REFERENCES product_variants(id),
        image_url VARCHAR(500) NOT NULL,
        alt_text VARCHAR(255),
        is_main BOOLEAN DEFAULT FALSE,
        order_index INT DEFAULT 0
      )
    `);
    console.log('✅ Product images table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS product_images CASCADE');
    console.log('✅ Product images table dropped');
  } finally {
    client.release();
  }
};
