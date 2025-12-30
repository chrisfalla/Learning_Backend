import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_number VARCHAR(50) UNIQUE NOT NULL,
        user_id INT NOT NULL REFERENCES users(id),
        status VARCHAR(20) DEFAULT 'pending',
        subtotal DECIMAL(10,2) NOT NULL,
        discount DECIMAL(10,2) DEFAULT 0,
        tax DECIMAL(10,2) DEFAULT 0,
        shipping DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        shipping_address_id INT REFERENCES addresses(id),
        billing_address_id INT REFERENCES addresses(id),
        coupon_id INT REFERENCES coupons(id),
        payment_method VARCHAR(50),
        payment_status VARCHAR(20) DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Orders table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS orders CASCADE');
    console.log('✅ Orders table dropped');
  } finally {
    client.release();
  }
};
