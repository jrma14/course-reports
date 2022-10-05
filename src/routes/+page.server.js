import mysql from 'mysql2/promise'
import { error } from '@sveltejs/kit'
import { DATABASE_URL } from '$env/static/private'
import { data } from '$lib/stores/filterResult.js'
import { get } from 'svelte/store';
import { runSearch } from '../lib/stores/filter'


/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    // runSearch() // doesn't work on load?
    // console.log('$data:', get(data));
}