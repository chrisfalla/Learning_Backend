import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS valores_atributo (
        id SERIAL PRIMARY KEY,
        atributo_id INT NOT NULL REFERENCES atributos_producto(id),
        valor VARCHAR(100) NOT NULL,
        valor_mostrar VARCHAR(100),
        color_hex VARCHAR(7),
        imagen_url VARCHAR(500),
        UNIQUE(atributo_id, valor)
      )
    `);
    console.log('✅ Tabla valores_atributo creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS valores_atributo CASCADE');
    console.log('✅ Tabla valores_atributo eliminada');
  } finally {
    client.release();
  }
};
