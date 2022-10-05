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
    let searchQuery = url.searchParams.get('searchQuery') ?? ''
    console.log(term)
    console.log(searchQuery)
    console.log(`SELECT course_title, course_number FROM courses WHERE term = ${term} AND course_title LIKE ${searchQuery} OR course_number LIKE ${searchQuery} GROUP BY course_number, course_title LIMIT 10`)
    let [rows] = await connection.execute('SELECT course_title, course_number FROM courses WHERE term = ? AND course_title LIKE ? OR course_number LIKE ? GROUP BY course_number, course_title LIMIT 10', [`${term}`, `%${searchQuery}%`, `%${searchQuery}%`])
    console.log(rows)
    // if (term.length > 0 || searchQuery.length > 0) {
    //     [rows] = await connection.execute('SELECT course_title, course_number FROM courses WHERE term = ? AND course_title LIKE ? OR course_number LIKE ? GROUP BY course_number, course_title', [term, `%${searchQuery}%`, `%${searchQuery}%`])
    //     // [rows] = await connection.execute(`SELECT course_title, course_number FROM courses WHERE ${term.length > 0 ? 'term = ?' : ''} ${searchQuery.length > 0 ? 'AND course_title LIKE ? OR course_number LIKE ?' : ''} GROUP BY course_number, course_title`, [term, ` % ${searchQuery}% `, ` % ${searchQuery}% `])
    // } else {
    //     [rows] = await connection.execute(`SELECT course_title, course_number FROM courses GROUP BY course_number, course_title LIMIT`)
    // }
    return json(rows)
}