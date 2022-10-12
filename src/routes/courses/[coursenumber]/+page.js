
import { error, json } from '@sveltejs/kit';
import { PUBLIC_URL } from '$env/static/public';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  // make fetch to get data based on params
  let data = await fetch(`${PUBLIC_URL}/api/query/${params.coursenumber}`);
  return await data.json();
}