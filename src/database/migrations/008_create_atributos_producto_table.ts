import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS atributos_producto (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) UNIQUE NOT NULL,
        nombre_mostrar VARCHAR(100) NOT NULL,
        tipo VARCHAR(20) DEFAULT 'texto'
      )
    `);
    console.log('✅ Tabla atributos_producto creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS atributos_producto CASCADE');
    console.log('✅ Tabla atributos_producto eliminada');
  } finally {
    client.release();
  }
};
