import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS items_orden (
        id SERIAL PRIMARY KEY,
        orden_id INT NOT NULL REFERENCES ordenes(id) ON DELETE CASCADE,
        variante_id INT NOT NULL REFERENCES variantes_producto(id),
        nombre_producto VARCHAR(255) NOT NULL,
        atributos JSONB,
        cantidad INT NOT NULL,
        precio_unitario DECIMAL(10,2) NOT NULL,
        precio_total DECIMAL(10,2) NOT NULL
      )
    `);
    console.log('✅ Tabla items_orden creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS items_orden CASCADE');
    console.log('✅ Tabla items_orden eliminada');
  } finally {
    client.release();
  }
};
