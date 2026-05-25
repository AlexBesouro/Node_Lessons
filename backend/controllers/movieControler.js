import { favorites } from "../../database/mockDB.js";

const getMovies = async (req, res) => {
    // function to fetch movies from an external API and return them in a formatted way
    try {
        const response = await fetch(`${process.env.API_MOVIES}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.statusText}`);
        }
        const movies = await response.json();
        const limitedMovies = movies.data.slice(0, 20);
        const formattedMovies = limitedMovies.map((movie) => {
            return {
                id: movie.id,
                title: movie.original_title,
                year: movie.release_date ? movie.release_date.split("-")[0] : "N/A",
                poster: movie.poster_path,
            };
        });
        res.json(formattedMovies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFavorites = (req, res) => {
    // function to return the list of favorite movies based on the IDs stored in the favorites array
    const favoriteMovies = movies.filter((movie) => favorites.includes(movie.id));
    res.json(favoriteMovies);
};
const addFavorite = (req, res) => {
    // function to add a movie ID to the favorites array if it's not already present and return the updated list of favorites
    const { id } = req.body;
    if (!favorites.includes(id)) {
        favorites.push(id);
    }
    res.status(201).json({ success: true, favorites: favorites });
};

const deleteFavorite = (req, res) => {
    //function to remove a movie ID from the favorites array based on the ID provided in the request parameters and return the updated list of favorites
    const movieId = parseInt(req.params.id);
    favorites = favorites.filter((id) => id !== movieId);
    res.json({ success: true, favorites: favorites });
};

export { getMovies, getFavorites, addFavorite, deleteFavorite };
