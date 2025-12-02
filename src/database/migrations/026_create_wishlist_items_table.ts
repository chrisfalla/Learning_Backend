import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS wishlist_items (
        wishlist_id INT NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
        variante_id INT NOT NULL REFERENCES variantes_producto(id),
        agregado_en TIMESTAMP DEFAULT NOW(),
        PRIMARY KEY (wishlist_id, variante_id)
      )
    `);
    console.log('✅ Tabla wishlist_items creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS wishlist_items CASCADE');
    console.log('✅ Tabla wishlist_items eliminada');
  } finally {
    client.release();
  }
};
