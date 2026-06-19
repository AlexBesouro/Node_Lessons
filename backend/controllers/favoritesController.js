import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { readFavorites, writeFavorites } from "../services/favoriteService.js";
import { fetchMoviesFromApi } from "../services/omdbService.js";
import { pool } from "../config/database.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../..", "database", "mockDB.json");

const getFavorites = async (req, res) => {
    try {
        const [favorites] = await pool.execute("SELECT * FROM favorites");
        // console.log(favorites);
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const addFavorite = async (req, res) => {
    try {
        const { id, title, year, type, poster } = req.body;
        if (!id || !title) {
            return res.status(400).json({ error: "Missing required fields (id, title)" });
        }
        const [rows] = await pool.execute("SELECT IMDB_ID FROM favorites WHERE id = ?", [id]);

        if (rows.length > 0) {
            return res.status(200).json({ message: "Already in favorites", movie: title });
        }

        const { movie } = await pool.execute(
            "INSERT INTO favorites (IMDB_ID, title, year, type, poster) VALUES (?, ?, ?, ?, ?)",
            [id, title, year, type, poster],
        );

        return res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

const deleteFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Missing required id field" });
        }

        const [row] = await pool.execute("SELECT IMDB_ID FROM favorites WHERE id = ?", [id]);

        if (row.length < 1) {
            return res.status(200).json({ message: `Movie with id ${id} not in favorites` });
        }
        await pool.execute("DELETE FROM favorites WHERE id = ?", [id]);

        return res.status(201).json({ message: "Movie deleted from favorites" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export { getFavorites, addFavorite, deleteFavorite };
