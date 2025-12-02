import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ordenes (
        id SERIAL PRIMARY KEY,
        numero_orden VARCHAR(50) UNIQUE NOT NULL,
        usuario_id INT NOT NULL REFERENCES usuarios(id),
        estado VARCHAR(20) DEFAULT 'pendiente',
        subtotal DECIMAL(10,2) NOT NULL,
        descuento DECIMAL(10,2) DEFAULT 0,
        impuesto DECIMAL(10,2) DEFAULT 0,
        envio DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        direccion_envio INT REFERENCES direcciones(id),
        direccion_facturacion INT REFERENCES direcciones(id),
        cupon_id INT REFERENCES cupones(id),
        metodo_pago VARCHAR(50),
        estado_pago VARCHAR(20) DEFAULT 'pendiente',
        notas TEXT,
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla ordenes creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS ordenes CASCADE');
    console.log('✅ Tabla ordenes eliminada');
  } finally {
    client.release();
  }
};
