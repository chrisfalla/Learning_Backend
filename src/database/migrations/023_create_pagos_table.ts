import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pagos (
        id SERIAL PRIMARY KEY,
        orden_id INT NOT NULL REFERENCES ordenes(id),
        metodo_pago VARCHAR(50) NOT NULL,
        id_transaccion VARCHAR(100) UNIQUE,
        monto DECIMAL(10,2) NOT NULL,
        moneda CHAR(3) DEFAULT 'USD',
        estado VARCHAR(20) DEFAULT 'pendiente',
        respuesta_gateway JSONB,
        pagado_en TIMESTAMP,
        monto_reembolsado DECIMAL(10,2) DEFAULT 0,
        reembolsado_en TIMESTAMP,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla pagos creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS pagos CASCADE');
    console.log('✅ Tabla pagos eliminada');
  } finally {
    client.release();
  }
};
