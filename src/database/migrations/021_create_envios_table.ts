import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS envios (
        id SERIAL PRIMARY KEY,
        orden_id INT NOT NULL REFERENCES ordenes(id),
        metodo_envio VARCHAR(100),
        numero_seguimiento VARCHAR(100),
        transportista VARCHAR(100),
        estado VARCHAR(20) DEFAULT 'pendiente',
        enviado_en TIMESTAMP,
        entregado_en TIMESTAMP,
        fecha_estimada DATE,
        costo_envio DECIMAL(10,2),
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla envios creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS envios CASCADE');
    console.log('✅ Tabla envios eliminada');
  } finally {
    client.release();
  }
};
