let MOVIES = await fetchAllMoviesFromApi(); // Because fakery generate fake id every time we using static way
// console.log(MOVIES);
async function fetchAllMoviesFromApi() {
    const response = await fetch(`${process.env.API_MOVIES}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const movies = await response.json();
    return movies.data.map((movie) => ({
        id: movie.id,
        title: movie.original_title,
        year: movie.release_date ? movie.release_date.slice(-4) : "N/A",
        poster: movie.poster_path,
        note: movie.note || "N/A",
    }));
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

export { fetchAllMoviesFromApi, fetchMovieById };
