import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        short_description VARCHAR(500),
        price DECIMAL(10,2) NOT NULL,
        compare_at_price DECIMAL(10,2),
        cost DECIMAL(10,2),
        category_id INT REFERENCES categories(id),
        brand_id INT REFERENCES brands(id),
        weight DECIMAL(8,2),
        dimensions VARCHAR(50),
        active BOOLEAN DEFAULT TRUE,
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Products table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS products CASCADE');
    console.log('✅ Products table dropped');
  } finally {
    client.release();
  }
};
