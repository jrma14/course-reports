
import { error, json } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  return {
    courseNumber: params.coursenumber,
  };
}