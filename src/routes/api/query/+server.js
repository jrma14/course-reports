import { error, json } from '@sveltejs/kit'
import mysql from 'mysql2/promise'
import { DATABASE_URL } from '$env/static/private'


/** @type {import ('./$types').RequestHandler} */
export async function GET({ url }) {
    const connection = await mysql.createPool({
        uri: DATABASE_URL,
        connectionLimit: 10
    })
    let term = url.searchParams.get('term') ?? ''
    console.log(term)
    let [rows] = await connection.execute('SELECT course_title FROM courses WHERE term = ?', [term])
    return json(rows)
}