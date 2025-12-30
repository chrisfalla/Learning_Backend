import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS variant_attributes (
        variant_id INT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
        attribute_value_id INT NOT NULL REFERENCES attribute_values(id),
        PRIMARY KEY (variant_id, attribute_value_id)
      )
    `);
    console.log('✅ Variant attributes table created');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS variant_attributes CASCADE');
    console.log('✅ Variant attributes table dropped');
  } finally {
    client.release();
  }
};
