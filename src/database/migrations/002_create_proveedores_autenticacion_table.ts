import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS proveedores_autenticacion (
        id SERIAL PRIMARY KEY,
        usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        proveedor VARCHAR(50) NOT NULL,
        proveedor_usuario_id VARCHAR(255) NOT NULL,
        correo VARCHAR(255),
        token_acceso TEXT,
        token_refresh TEXT,
        creado_en TIMESTAMP DEFAULT NOW(),
        UNIQUE (proveedor, proveedor_usuario_id)
      )
    `);
    console.log('✅ Tabla proveedores_autenticacion creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS proveedores_autenticacion CASCADE');
    console.log('✅ Tabla proveedores_autenticacion eliminada');
  } finally {
    client.release();
  }
};
