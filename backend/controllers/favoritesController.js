import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { fetchMoviesFromApi } from "../services/omdbService.js";
import { prisma } from "../config/database.js";

const getFavorites = async (req, res) => {
    try {
        const favorites = await prisma.favorites.findMany();
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
        const rows = await prisma.favorites.findFirst({ where: { IMDB_ID: id }, select: { title: true } });

        if (rows) {
            return res.status(200).json({ message: "Already in favorites", movie: title });
        }

        const movie = await prisma.favorites.create({
            data: {
                IMDB_ID: id,
                title: title,
                year: Number(year),
                type: type,
                poster: poster,
            },
        });
        console.log({ movie: movie, rows: movie.affectedRows });

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
        const row = await prisma.favorites.findUnique({ where: { id: id } });

        if (!row) {
            return res.status(200).json({ message: `Movie with id ${id} not in favorites` });
        }
        await prisma.favorites.delete({ where: { id: id } });

        return res.status(201).json({ message: "Movie deleted from favorites" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

export { getFavorites, addFavorite, deleteFavorite };
