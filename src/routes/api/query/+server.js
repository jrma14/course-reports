import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/database.js';

const RES_LIMIT = 20;

/** @type {import ('./$types').RequestHandler} */
export async function GET({ url }) {
	const connection = await connect();
	let queryParams = [];
	let queries = [];
	let termQuery = 'terms_available LIKE ? ';
	if (url.searchParams.get('term').length > 0) {
		let term = url.searchParams.get('term');
		let terms = term.split(',');
		let tQ = [];
		for (let t of terms) {
			tQ.push(termQuery);
			queryParams.push(`%${t}%`);
		}
		queries.push(`(${tQ.join('OR ')}) `);
	}
	let sQuery = '(course_title LIKE ? OR course_number LIKE ?) ';
	if (url.searchParams.get('searchQuery').length > 0) {
		queryParams.push(`%${url.searchParams.get('searchQuery')}%`);
		queryParams.push(`%${url.searchParams.get('searchQuery')}%`);
		queries.push(sQuery);
	}
	let subjectQuery = 'subject LIKE ? ';
	if (url.searchParams.get('subjects').length > 0) {
		let param = url.searchParams.get('subjects');
		let subjects = param.split(',');
		let subjectsQuery = [];
		for (let subject of subjects) {
			subjectsQuery.push(subjectQuery);
			queryParams.push(subject);
		}
		queries.push(`(${subjectsQuery.join('OR ')}) `);
	}
	let search =
		'SELECT course_title, course_number, subject FROM course_overviews GROUP BY course_title,course_number,subject';
	// 'SELECT course_title, course_number, subject FROM courses  GROUP BY course_title, course_number, subject';
	// console.log(queryParams.length)
	// console.log(search);
	if (queryParams.length > 0) {
		search =
			'SELECT course_title, course_number, subject FROM course_overviews WHERE ' +
			queries.join('AND ') +
			'GROUP BY course_number, course_title, subject';
	}

	//add limit to query
	search += ` LIMIT ${RES_LIMIT}`;
	// console.log(search);

	// console.log(search)
	// console.log(queryParams)
	let [rows] = await connection.execute(search, queryParams);
	// console.log(rows)
	return json(rows);
}
