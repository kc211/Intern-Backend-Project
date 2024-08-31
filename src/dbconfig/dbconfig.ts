import knex, { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config();

const db: Knex = knex({
  client: "mysql2",
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    port: Number(process.env.MYSQL_PORT)  },
});

db.raw('SELECT 1').then(() => {
  console.log('Database connection established');
}).catch(err => {
  console.error('Failed to connect to the database:', err);
});
export default db;
