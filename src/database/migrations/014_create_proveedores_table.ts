import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS proveedores (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        correo_contacto VARCHAR(255),
        telefono_contacto VARCHAR(20),
        sitio_web VARCHAR(255),
        direccion TEXT,
        activo BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla proveedores creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS proveedores CASCADE');
    console.log('✅ Tabla proveedores eliminada');
  } finally {
    client.release();
  }
};
