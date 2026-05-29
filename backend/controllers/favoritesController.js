import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { readFavorites, writeFavorites } from "../services/favoriteService.js";
import { fetchMoviesFromApi } from "../services/omdbService.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../..", "database", "mockDB.json");

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
            const allMovies = await fetchMoviesFromApi();
            movieToAdd = allMovies.find((movie) => String(movie.id) === String(id));
        }

        if (!movieToAdd) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const alreadyExists = favorites.some((movie) => String(movie.id) === String(movieToAdd.id));

        if (!alreadyExists) {
            favorites.push(movieToAdd);
            await writeFavorites(favorites);
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

// const updateFavorites = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { note } = req.body;
//         const favorites = await readFavorites();
//         const movieIndex = favorites.findIndex((movie) => String(movie.id) === String(id));
//         if (movieIndex === -1) {
//             return res.status(404).json({ error: "Movie not found" });
//         }
//         favorites[movieIndex].note = note;
//         await writeFavorites(favorites);
//         return res.json(favorites);
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// };

export { getFavorites, addFavorite, deleteFavorite };
