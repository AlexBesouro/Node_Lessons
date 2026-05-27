import { fetchAllMoviesFromApi, fetchMovieById } from "../services/fakeryService.js";

const getMovies = async (req, res) => {
    try {
        const allMovies = await fetchAllMoviesFromApi();
        const limitedMovies = allMovies.slice(0, 20);
        // console.log(limitedMovies.slice(0, 3));
        res.json(limitedMovies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await fetchMovieById(id);
        // console.log(movie);
        res.json(movie);
    } catch (error) {
        console.error("Error getMovieById:", error.message);
        if (error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
};

export { getMovies, getMovieById }; //
