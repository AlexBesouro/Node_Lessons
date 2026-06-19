import { fetchMoviesFromApi, fetchMovieById } from "../services/omdbService.js";

const getMovies = async (req, res) => {
    try {
        const { title, year, type, page } = req.query;
        const movies = await fetchMoviesFromApi({ title, year, type, page });
        // console.log(movies);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await fetchMovieById(id);

        res.json(movie);
    } catch (error) {
        console.error("Error getMovieById:", error.message);
        if (error.message.includes("not found")) {
            return res.status(404).json({ error: error.message });
        }
        return res.status(500).json({ error: error.message });
    }
};

const getMoviesShortInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await fetchMovieById(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        const shortInfo = {
            title: movie.title,
            year: movie.year,
        };
        res.json(shortInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getMovies, getMovieById, getMoviesShortInfo }; //
