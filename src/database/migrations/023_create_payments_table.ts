import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id),
        payment_method VARCHAR(50) NOT NULL,
        transaction_id VARCHAR(100) UNIQUE,
        amount DECIMAL(10,2) NOT NULL,
        currency CHAR(3) DEFAULT 'USD',
        status VARCHAR(20) DEFAULT 'pending',
        gateway_response JSONB,
        paid_at TIMESTAMP,
        refunded_amount DECIMAL(10,2) DEFAULT 0,
        refunded_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Payments table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS payments CASCADE');
    console.log('✅ Payments table dropped');
  } finally {
    client.release();
  }
};
