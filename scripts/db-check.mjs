import 'dotenv/config';
import pg from 'pg';

console.log('ENV DATABASE_URL =', process.env.DATABASE_URL);
try {
  const u = new URL(process.env.DATABASE_URL);
  console.log('HOST =', u.hostname);
} catch (e) {
  console.log('URL inválida:', e.message);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
try {
  await client.connect();
  const r = await client.query('select now() as now;');
  console.log('OK DB:', r.rows[0]);
} catch (e) {
  console.error('DB ERROR:', e.message);
} finally {
  await client.end();
}
