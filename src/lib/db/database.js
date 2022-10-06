import mysql from 'mysql2/promise';
import { DATABASE_URL } from '$env/static/private';
let connection = null;

export async function connect() {
    if (!connection) {
        connection = await mysql.createPool({
            uri: DATABASE_URL,
            connectionLimit: 10
        });
    }
    return connection;
}

