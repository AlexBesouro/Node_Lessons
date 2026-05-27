import express from "express";
import { getMovies, getMovieById } from "../controllers/movieControler.js"; //
import { getFavorites, addFavorite, deleteFavorite, updateFavorites } from "../controllers/favoritesController.js";

const router = express.Router(); // express.Router() creates a new router object to handle routes for the application

router.get("/movies", getMovies);
router.get("/favorites", getFavorites);
router.post("/favorites", addFavorite);
router.get("/movies/:id", getMovieById);
router.put("/favorites/:id", updateFavorites);
router.delete("/favorites/:id", deleteFavorite);

export { router };
