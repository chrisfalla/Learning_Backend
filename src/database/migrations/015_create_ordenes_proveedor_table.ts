import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS ordenes_proveedor (
        id SERIAL PRIMARY KEY,
        proveedor_id INT NOT NULL REFERENCES proveedores(id),
        numero_orden VARCHAR(50) UNIQUE NOT NULL,
        estado VARCHAR(20) DEFAULT 'pendiente',
        monto_total DECIMAL(10,2) NOT NULL,
        fecha_entrega_esperada DATE,
        entregado_en TIMESTAMP,
        creado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla ordenes_proveedor creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS ordenes_proveedor CASCADE');
    console.log('✅ Tabla ordenes_proveedor eliminada');
  } finally {
    client.release();
  }
};
