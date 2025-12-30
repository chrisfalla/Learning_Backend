import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        user_id INT NOT NULL REFERENCES users(id),
        order_item_id INT REFERENCES order_items(id),
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        title VARCHAR(200),
        comment TEXT NOT NULL,
        verified_purchase BOOLEAN DEFAULT FALSE,
        approved BOOLEAN DEFAULT TRUE,
        helpful_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Reviews table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS reviews CASCADE');
    console.log('✅ Reviews table dropped');
  } finally {
    client.release();
  }
};
