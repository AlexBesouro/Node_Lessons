import { searchMovies, getMovieUrlById } from "./urlBuilder.js";
async function fetchMoviesFromApi({ title, year, type, page }) {
    try {
        const apiUrl = searchMovies({ title, year, type, page });

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`OMDb API responded with status: ${response.status}`);
        }
        const movies = await response.json();
        if (!movies.Search) {
            return [];
        }
        // console.log(movies);

        return {
            totalResults: movies.totalResults,
            movies: movies.Search.map((movie) => ({
                id: movie.imdbID,
                title: movie.Title,
                year: movie.Year ? movie.Year : "N/A",
                type: movie.Type,
                poster: movie.Poster,
            })),
        };
    } catch (error) {
        console.error(`fetchMoviesFromApi error: ${error.message}`);
    }
}
async function fetchMovieById(id) {
    const apiUrl = getMovieUrlById(id);
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
        throw new Error(`Movie with ID ${id} not found in external API`);
    }
    const movie = await response.json();

    return {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year ? movie.Year : "N/A",
        type: movie.Type,
        poster: movie.Poster,
    };
}

export { fetchMoviesFromApi, fetchMovieById };
