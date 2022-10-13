
import { error, json } from '@sveltejs/kit';
import { PUBLIC_URL } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
  // make fetch to get data based on params
  let data = await fetch(`${PUBLIC_URL}/api/query/${params.coursenumber}`);
  const json = await data.json();
  if (json.length)
    return json
  throw error(404, 'Course Not found');
}