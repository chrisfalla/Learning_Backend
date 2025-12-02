import pool from '../config/database';

export const up = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS variantes_atributos (
        variante_id INT NOT NULL REFERENCES variantes_producto(id) ON DELETE CASCADE,
        valor_atributo_id INT NOT NULL REFERENCES valores_atributo(id),
        PRIMARY KEY (variante_id, valor_atributo_id)
      )
    `);
    console.log('✅ Tabla variantes_atributos creada');
  } finally {
    client.release();
  }
};

export const down = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS variantes_atributos CASCADE');
    console.log('✅ Tabla variantes_atributos eliminada');
  } finally {
    client.release();
  }
};
