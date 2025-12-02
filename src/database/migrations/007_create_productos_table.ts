import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id SERIAL PRIMARY KEY,
        sku VARCHAR(50) UNIQUE NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        descripcion TEXT NOT NULL,
        descripcion_corta VARCHAR(500),
        precio DECIMAL(10,2) NOT NULL,
        precio_comparacion DECIMAL(10,2),
        costo DECIMAL(10,2),
        categoria_id INT REFERENCES categorias(id),
        marca_id INT REFERENCES marcas(id),
        peso DECIMAL(8,2),
        dimensiones VARCHAR(50),
        activo BOOLEAN DEFAULT TRUE,
        destacado BOOLEAN DEFAULT FALSE,
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla productos creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS productos CASCADE');
    console.log('✅ Tabla productos eliminada');
  } finally {
    client.release();
  }
};
