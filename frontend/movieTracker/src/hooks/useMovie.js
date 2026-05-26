import { useState, useEffect } from "react";
const ENDPOINT = "api/";
function useMovie() {
    const [movies, setMovies] = useState([]);
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}${ENDPOINT}movies`,
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch movies: ${response.statusText}`);
                }
                const data = await response.json();
                setMovies(data);
            } catch (error) {
                console.error(`Error fetching movies: ${error.message}`);
            }
        }
        fetchMovies();
        async function fetchFavorites() {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}${ENDPOINT}favorites`,
                );
                if (!response.ok) {
                    throw new Error(`Failed to fetch favorites movies: ${response.statusText}`);
                }
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error(`Error fetching favorites movies: ${error.message}`);
            }
        }
        fetchFavorites();
    }, []);
    const toggleFavorite = async (movie) => {
        const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);
        if (isFavorite) {
            const response = await fetch(
                `${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}${ENDPOINT}favorites/${movie.id}`,
                {
                    method: "DELETE",
                },
            );
            if (!response.ok) {
                console.error(`Failed to delete favorite: ${response.statusText}`);
                return;
            }
            const updatedFavorites = await response.json();
            setFavorites(updatedFavorites);
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}${ENDPOINT}favorites/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        });
        if (!response.ok) {
            console.error(`Failed to add favorite: ${response.statusText}`);
            return;
        }
        const updatedFavorites = await response.json();
        setFavorites(updatedFavorites);
    };
    return { movies, favorites, toggleFavorite };
}
export { useMovie };
