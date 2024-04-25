import { error } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
	try {
		const res = await fetch('https://cdn.jsdelivr.net/npm/country-flag-emoji-json');
		if (res.ok) {
			const data = await res.json();
			return { data };
		}
		throw error(res.status, 'Failed to load data');
	} catch (e) {
		throw error(500, 'An error occurred while loading data');
	}
};
