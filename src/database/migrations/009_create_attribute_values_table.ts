import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS attribute_values (
        id SERIAL PRIMARY KEY,
        attribute_id INT NOT NULL REFERENCES product_attributes(id),
        value VARCHAR(100) NOT NULL,
        display_value VARCHAR(100),
        color_hex VARCHAR(7),
        image_url VARCHAR(500),
        UNIQUE(attribute_id, value)
      )
    `);
    console.log('✅ Attribute values table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS attribute_values CASCADE');
    console.log('✅ Attribute values table dropped');
  } finally {
    client.release();
  }
};
