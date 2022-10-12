import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/database.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    let courseNumber = params.courseNumber.replace('-', ' ').toUpperCase()
    const connection = await connect();
    const query = 'SELECT course_title, co.course_number, c.term, c.year, p.first_name, p.last_name, c.course_report_data FROM course_overviews co join courses c on co.id = c.overview_id join professors p on p.id = c.professor_id WHERE co.course_number = ? LIMIT 20'

    let [rows] = await connection.execute(query, [courseNumber]);
    return json(rows);
}
