import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS cupones (
        id SERIAL PRIMARY KEY,
        codigo VARCHAR(50) UNIQUE NOT NULL,
        tipo_descuento VARCHAR(20) DEFAULT 'porcentaje',
        valor_descuento DECIMAL(10,2) NOT NULL,
        compra_minima DECIMAL(10,2),
        descuento_maximo DECIMAL(10,2),
        limite_uso INT,
        usos INT DEFAULT 0,
        valido_desde TIMESTAMP,
        valido_hasta TIMESTAMP,
        activo BOOLEAN DEFAULT TRUE,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla cupones creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS cupones CASCADE');
    console.log('✅ Tabla cupones eliminada');
  } finally {
    client.release();
  }
};
