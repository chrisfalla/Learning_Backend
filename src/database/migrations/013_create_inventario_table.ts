import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventario (
        id SERIAL PRIMARY KEY,
        variante_id INT NOT NULL REFERENCES variantes_producto(id) ON DELETE CASCADE,
        cantidad INT NOT NULL DEFAULT 0,
        cantidad_reservada INT DEFAULT 0,
        umbral_bajo INT DEFAULT 5,
        ubicacion VARCHAR(100),
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla inventario creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS inventario CASCADE');
    console.log('✅ Tabla inventario eliminada');
  } finally {
    client.release();
  }
};
