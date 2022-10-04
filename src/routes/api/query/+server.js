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
    let searchQuery = url.searchParams.get('searchQuery') ?? 'web'
    let [rows] = await connection.execute('SELECT course_title, course_number FROM courses WHERE term = ? AND course_title LIKE ? OR course_number LIKE ? GROUP BY course_number, course_title', [term, `%${searchQuery}%`, `%${searchQuery}%`])
    return json(rows)
}