import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS wishlist_items (
        wishlist_id INT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
        variant_id INT NOT NULL REFERENCES product_variants(id),
        added_at TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (wishlist_id, variant_id)
      )
    `);
    console.log('✅ Wishlist items table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS wishlist_items CASCADE');
    console.log('✅ Wishlist items table dropped');
  } finally {
    client.release();
  }
};
