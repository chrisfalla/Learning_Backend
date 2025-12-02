import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS reseñas (
        id SERIAL PRIMARY KEY,
        producto_id INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
        usuario_id INT NOT NULL REFERENCES usuarios(id),
        item_orden_id INT REFERENCES items_orden(id),
        calificacion INT NOT NULL CHECK (calificacion BETWEEN 1 AND 5),
        titulo VARCHAR(200),
        comentario TEXT NOT NULL,
        compra_verificada BOOLEAN DEFAULT FALSE,
        aprobada BOOLEAN DEFAULT TRUE,
        utiles INT DEFAULT 0,
        creado_en TIMESTAMP DEFAULT NOW(),
        actualizado_en TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Tabla reseñas creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS reseñas CASCADE');
    console.log('✅ Tabla reseñas eliminada');
  } finally {
    client.release();
  }
};
