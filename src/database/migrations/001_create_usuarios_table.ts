import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        correo VARCHAR(255) UNIQUE NOT NULL,
        contrasena_hash VARCHAR(255),
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        telefono VARCHAR(20),
        rol VARCHAR(20) DEFAULT 'cliente',
        correo_verificado BOOLEAN DEFAULT FALSE,
        token_verificacion VARCHAR(100),
        token_recuperacion VARCHAR(100),
        token_recuperacion_expira TIMESTAMP,
        ultimo_login TIMESTAMP,
        activo BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla usuarios creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS usuarios CASCADE');
    console.log('✅ Tabla usuarios eliminada');
  } finally {
    client.release();
  }
};
