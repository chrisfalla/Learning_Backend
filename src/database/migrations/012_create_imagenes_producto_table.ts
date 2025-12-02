import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS imagenes_producto (
        id SERIAL PRIMARY KEY,
        producto_id INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
        variante_id INT REFERENCES variantes_producto(id),
        imagen_url VARCHAR(500) NOT NULL,
        texto_alt VARCHAR(255),
        principal BOOLEAN DEFAULT FALSE,
        orden INT DEFAULT 0
      )
    `);
    console.log('✅ Tabla imagenes_producto creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS imagenes_producto CASCADE');
    console.log('✅ Tabla imagenes_producto eliminada');
  } finally {
    client.release();
  }
};
