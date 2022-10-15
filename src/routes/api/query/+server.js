import { json } from '@sveltejs/kit';
import { connect } from '$lib/db/database.js';

const RES_LIMIT = 50;

/** @type {import ('./$types').RequestHandler} */
export async function GET({ url }) {
	const connection = await connect();

	const term = url.searchParams.get('term');
	const subjects = url.searchParams.get('subjects');
	const searchQuery = url.searchParams.get('searchQuery');
	const offset = parseInt(url.searchParams.get('offset')) || 0;
	const limit = parseInt(url.searchParams.get('limit')) || RES_LIMIT;

	const filters = [];
	const params = [];

	if (term) {
		const terms = term.split(',');
		const termStrings = [];
		terms.map((term) => {
			termStrings.push('terms_available LIKE ?');
			params.push(term);
		});
		filters.push(`(${termStrings.join(' OR ')})`);
	}

	if (subjects) {
		const subjectsArray = subjects.split(',');
		const subjectStrings = [];
		subjectsArray.map((subject) => {
			subjectStrings.push('subject_abbreviation = ?');
			params.push(subject);
		});
		filters.push(`(${subjectStrings.join(' OR ')})`);
	}

	if (searchQuery) {
		filters.push(`MATCH(course_title, course_number) AGAINST(? IN BOOLEAN MODE)`);
		params.push(`${searchQuery}*`);
	}

	params.push(limit);
	params.push(offset);

	const filterString = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

	const query = `SELECT course_title, course_number, subject, overall_average_rating, overall_average_grade, overall_average_work FROM course_overviews ${filterString} LIMIT ? OFFSET ?`;

	let __metadata = {
		'offsets': {
			'next': offset + limit,
			'current': offset,
			'previous': offset - limit > 0 ? offset - limit : 0
		}
	}
	// console.log(query, params, '\n');
	let [rows] = await connection.execute(query, params);

	return json({ '__metadata': __metadata, 'courses': rows });
}
