import { BASE_URL } from "../config/api.js";

async function fetchMovies({ title, year, type, page = 1 }) {
    const queryParams = new URLSearchParams({ title, year, type, page: String(page) });
    console.log(`${queryParams}`);
    const response = await fetch(`${BASE_URL}movies?${queryParams}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch movies ${response.statusText} -- fetchMovies`);
    }
    return response.json();
}

export { fetchMovies };
