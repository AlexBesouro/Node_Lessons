import express from "express";
import { getMovies, getMovieById, getMoviesShortInfo } from "../controllers/movieController.js"; //
import { getFavorites, addFavorite, deleteFavorite } from "../controllers/favoritesController.js";

const router = express.Router(); // express.Router() creates a new router object to handle routes for the application

router.get("/movies", getMovies);
router.get("/movies/:id/short", getMoviesShortInfo);
router.get("/movies/:id", getMovieById);
router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.delete("/favorites/:id", deleteFavorite);

export { router };
