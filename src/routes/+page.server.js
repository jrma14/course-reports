import mysql from 'mysql2/promise'
import { error } from '@sveltejs/kit'
import { DATABASE_URL } from '$env/static/private'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const connection = await mysql.createConnection(DATABASE_URL)
    console.time('db')
    let [rows] = await connection.query('SELECT course_title FROM courses LIMIT 100')
    console.timeEnd('db')
    // console.log(rows)
    return rows

}