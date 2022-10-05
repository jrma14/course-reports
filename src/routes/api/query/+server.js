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
    if (url.searchParams.get('term').length > 0) {
        let term = url.searchParams.get('term')
        let terms = term.split(',')
        let tQ = []
        for (let t of terms) {
            tQ.push(termQuery)
            queryParams.push(t)
        }
        queries.push(`(${tQ.join('OR ')}) `)
    }
    let sQuery = '(course_title LIKE ? OR course_number LIKE ?) '
    if (url.searchParams.get('searchQuery').length > 0) {
        queryParams.push(`%${url.searchParams.get('searchQuery')}%`)
        queryParams.push(`%${url.searchParams.get('searchQuery')}%`)
        queries.push(sQuery)
    }
    let subjectQuery = 'subject LIKE ? '
    if (url.searchParams.get('subjects').length > 0) {
        let param = url.searchParams.get('subjects')
        let subjects = param.split(',')
        let subjectsQuery = []
        for (let subject of subjects) {
            subjectsQuery.push(subjectQuery)
            queryParams.push(subject)
        }
        queries.push(`(${subjectsQuery.join('OR ')}) `)
    }
    let search = 'SELECT course_title, course_number, subject FROM courses GROUP BY course_title, course_number, subject'
    // console.log(queryParams.length)
    if (queryParams.length > 0) {
        search = 'SELECT course_title, course_number, subject FROM courses WHERE ' + queries.join('AND ') + 'GROUP BY course_number, course_title, subject'
    }
    // console.log(search)
    // console.log(queryParams)
    let [rows] = await connection.execute(search, queryParams)
    // console.log(rows)
    return json(rows)
}