import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS items_carrito (
        id SERIAL PRIMARY KEY,
        carrito_id INT NOT NULL REFERENCES carritos(id) ON DELETE CASCADE,
        variante_id INT NOT NULL REFERENCES variantes_producto(id),
        cantidad INT NOT NULL CHECK (cantidad > 0),
        agregado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla items_carrito creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS items_carrito CASCADE');
    console.log('✅ Tabla items_carrito eliminada');
  } finally {
    client.release();
  }
};
