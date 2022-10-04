import { writable } from 'svelte/store';


export const searchQuery = writable('');
export const term = writable('');
export const subject = writable('');

export function runSearch() {
console.log('running search: ');
//print out the values of the stores
searchQuery.subscribe(value => console.log( 'searchQuery: ' + value));
term.subscribe(value => console.log( 'term: ' + value));
subject.subscribe(value => console.log( 'subject: ' + value));
}
