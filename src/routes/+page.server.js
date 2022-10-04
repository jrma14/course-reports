import mysql from 'mysql2/promise'
import { error } from '@sveltejs/kit'
import { DATABASE_URL } from '$env/static/private'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const connection = await mysql.createPool({
        uri: DATABASE_URL,
        connectionLimit: 10
    })
    console.time('db')
    let [rows] = await connection.query('SELECT course_title FROM courses LIMIT 10')
    console.timeEnd('db')
    return rows

}