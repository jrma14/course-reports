import { writable, get } from 'svelte/store';
import { data } from "$lib/stores/filterResult.js"


export const searchQuery = writable('');
export const term = writable('');
export const subject = writable('');

export async function runSearch() {
    let res = await fetch(`http://127.0.0.1:5173/api/query/?term=${get(term)}&searchQuery=${get(searchQuery)}&subjects=${get(subject)}`)
    let json = await res.json()
    data.set(Object.values(json))
}
