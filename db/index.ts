import { Client } from 'pg';

const db = new Client({
  user: "postgres",
  host: "localhost",
  database: "twinter",
  password: "12120404",
  port: 5432,
});

db.connect();

export default db;
