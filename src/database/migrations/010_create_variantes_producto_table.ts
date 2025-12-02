import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS variantes_producto (
        id SERIAL PRIMARY KEY,
        producto_id INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
        sku VARCHAR(50) UNIQUE NOT NULL,
        precio DECIMAL(10,2),
        precio_comparacion DECIMAL(10,2),
        costo DECIMAL(10,2),
        peso DECIMAL(8,2),
        imagen_url VARCHAR(500),
        por_defecto BOOLEAN DEFAULT FALSE
      )
    `);
    console.log('✅ Tabla variantes_producto creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS variantes_producto CASCADE');
    console.log('✅ Tabla variantes_producto eliminada');
  } finally {
    client.release();
  }
};
