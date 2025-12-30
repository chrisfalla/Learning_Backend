import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS shipments (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id),
        shipping_method VARCHAR(100),
        tracking_number VARCHAR(100),
        carrier VARCHAR(100),
        status VARCHAR(20) DEFAULT 'pending',
        shipped_at TIMESTAMP,
        delivered_at TIMESTAMP,
        estimated_date DATE,
        shipping_cost DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Shipments table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS shipments CASCADE');
    console.log('✅ Shipments table dropped');
  } finally {
    client.release();
  }
};
