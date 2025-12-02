import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new Pool(databaseConfig);

export default pool;
