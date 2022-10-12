import { writable, get } from 'svelte/store';
import { data } from '$lib/stores/filterResult.js';
import { PUBLIC_URL } from '$env/static/public';

export const searchQuery = writable('');
export const term = writable('');
export const subject = writable([]);
export const offset = writable(0);

export async function runSearch() {
	let res = await fetch(
		`${PUBLIC_URL}/api/query/?term=${get(term)}&searchQuery=${get(searchQuery)}&subjects=${get(
			subject
		).join(',')}&offset=${get(offset)}`
	);
	console.log(get(subject).join(','));
	let json = await res.json();
	data.set(Object.values(json));
}
