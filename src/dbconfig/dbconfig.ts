import knex,{Knex} from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const db: Knex =knex({
    client: "mysql2",
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB,
    },
});

export default db;