import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS facturas (
        id SERIAL PRIMARY KEY,
        orden_id INT NOT NULL REFERENCES ordenes(id),
        numero_factura VARCHAR(50) UNIQUE NOT NULL,
        fecha_emision DATE NOT NULL,
        fecha_vencimiento DATE,
        estado VARCHAR(20) DEFAULT 'pendiente',
        subtotal DECIMAL(10,2) NOT NULL,
        impuesto DECIMAL(10,2) NOT NULL,
        total DECIMAL(10,2) NOT NULL,
        metodo_pago VARCHAR(50),
        pagado_en TIMESTAMP,
        pdf_url VARCHAR(500),
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla facturas creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS facturas CASCADE');
    console.log('✅ Tabla facturas eliminada');
  } finally {
    client.release();
  }
};
