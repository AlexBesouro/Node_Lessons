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
    }, []);
    const toggleFavorite = async (movie) => {
        const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);
        if (isFavorite) {
            await fetch(
                `${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}${ENDPOINT}favorites/${movie.id}`,
                {
                    method: "DELETE",
                },
            );
        } else {
            await fetch(`${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}${ENDPOINT}favorites/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: movie.id }),
            });
            setFavorites([...favorites, movie]);
        }
    };
    return { movies, favorites, toggleFavorite };
}
export { useMovie };
