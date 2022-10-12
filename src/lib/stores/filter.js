import { writable, get } from 'svelte/store';
import { data } from '$lib/stores/filterResult.js';
import { PUBLIC_URL } from '$env/static/public';

export const filters = writable({
	'searchQuery': '',
	'terms': '',
	'subjects': [],
	'offset': 0,
})
