import { error, json } from '@sveltejs/kit'
import mysql from 'mysql2/promise'
import { DATABASE_URL } from '$env/static/private'


/** @type {import ('./$types').RequestHandler} */
export async function GET({ url }) {
    const connection = await mysql.createPool({
        uri: DATABASE_URL,
        connectionLimit: 10
    })
    let queryParams = []
    let queries = []
    let termQuery = 'term = ? '
    if (url.searchParams.get('term') != undefined) {
        queryParams.push(url.searchParams.get('term'))
        queries.push(termQuery)
    }
    let sQuery = '(course_title LIKE ? OR course_number LIKE ?) '
    if (url.searchParams.get('searchQuery') != undefined) {
        queryParams.push(`%${url.searchParams.get('searchQuery')}%`)
        queryParams.push(`%${url.searchParams.get('searchQuery')}%`)
        queries.push(sQuery)
    }
    let search = 'SELECT course_title, course_number FROM courses WHERE ' + queries.join('AND ') + 'GROUP BY course_number, course_title LIMIT 10'
    // console.log(search)
    // console.log(queryParams)
    let [rows] = await connection.execute(search, queryParams)
    // console.log(rows)
    return json(rows)
}