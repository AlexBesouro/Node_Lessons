import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../..", "database", "mockDB.json");

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
    }));
}

async function readFavorites() {
    try {
        const rawData = await fs.readFile(filePath, "utf-8");
        if (!rawData.trim()) {
            return [];
        }
        const data = JSON.parse(rawData);
        return Array.isArray(data) ? data : data.favorites || [];
    } catch (error) {
        console.error(`Error file reading, ${error.message}`);
        return [];
    }
}


const getMovies = async (req, res) => {
    try {
        const allMovies = await fetchAllMoviesFromApi();
        const limitedMovies = allMovies.slice(0, 20); 
        res.json(limitedMovies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFavorites = async (req, res) => {
    try {
        const favorites = await readFavorites(); 
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const addFavorite = async (req, res) => {
    try {
        const favoritePayload = req.body;
        const { id } = favoritePayload;
        const favorites = await readFavorites();

        let movieToAdd = favoritePayload && favoritePayload.title ? favoritePayload : null;

        if (!movieToAdd) {
            const allMovies = await fetchAllMoviesFromApi();
            movieToAdd = allMovies.find((movie) => String(movie.id) === String(id));
        }

        if (!movieToAdd) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const alreadyExists = favorites.some((movie) => String(movie.id) === String(movieToAdd.id));

        if (!alreadyExists) {
            favorites.push(movieToAdd);
            await fs.writeFile(filePath, JSON.stringify(favorites, null, 4), "utf-8");
            return res.status(201).json(favorites);
        }

        return res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const favorites = await readFavorites();
        const updatedFavorites = favorites.filter((movie) => String(movie.id) !== String(id));

        await fs.writeFile(filePath, JSON.stringify(updatedFavorites, null, 4), "utf-8");
        return res.status(200).json(updatedFavorites);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export { getMovies, getFavorites, addFavorite, deleteFavorite };
