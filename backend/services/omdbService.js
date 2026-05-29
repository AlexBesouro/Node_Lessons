import { searchMovies } from "./urlBuilder.js";
async function fetchMoviesFromApi({ title, year, type }) {
    try {
        const apiUrl = searchMovies({ title, year, type });

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`OMDb API responded with status: ${response.status}`);
        }
        const movies = await response.json();
        if (!movies.Search) {
            return [];
        }
        console.log(movies);

        return movies.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year ? movie.Year : "N/A",
            type: movie.Type,
            poster: movie.Poster,
        }));
    } catch (error) {
        console.error(`fetchMoviesFromApi error: ${error.message}`);
    }
}
async function fetchMovieById(id) {
    //----------------THIS WOULD BE THE RIGHT WAY TO DO----------------
    // const response = await fetch(`${process.env.API_MOVIES}/${id}`);
    // if (!response.ok) {
    //     throw new Error(`Movie with ID ${id} not found in external API`);
    // }
    // const movie = await response.json();
    // return {
    //     id: movie.id,
    //     title: movie.original_title,
    //     year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
    //     poster: movie.poster_path,
    // ---------------------------------------------------------------------
    const movie = MOVIES.find((movie) => movie.id === id);
    return {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        note: movie.note ? movie.note : "N/A",
    };
}

export { fetchMoviesFromApi, fetchMovieById };
