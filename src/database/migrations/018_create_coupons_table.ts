import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        discount_type VARCHAR(20) DEFAULT 'percentage',
        discount_value DECIMAL(10,2) NOT NULL,
        minimum_purchase DECIMAL(10,2),
        maximum_discount DECIMAL(10,2),
        usage_limit INT,
        usage_count INT DEFAULT 0,
        valid_from TIMESTAMP,
        valid_until TIMESTAMP,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Coupons table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS coupons CASCADE');
    console.log('✅ Coupons table dropped');
  } finally {
    client.release();
  }
};
