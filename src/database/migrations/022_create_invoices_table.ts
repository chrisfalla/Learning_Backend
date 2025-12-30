import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        order_id INT NOT NULL REFERENCES orders(id),
        invoice_number VARCHAR(50) UNIQUE NOT NULL,
        issue_date DATE NOT NULL,
        due_date DATE,
        status VARCHAR(20) DEFAULT 'pending',
        subtotal DECIMAL(10,2) NOT NULL,
        tax DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50),
        paid_at TIMESTAMP,
        pdf_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Invoices table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS invoices CASCADE');
    console.log('✅ Invoices table dropped');
  } finally {
    client.release();
  }
};
