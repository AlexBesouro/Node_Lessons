import { useState, useEffect } from "react";
import { BASE_URL } from "./useMovie";

function useFavorites() {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        async function fetchFavorites() {
            try {
                const response = await fetch(`${BASE_URL}favorites`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setFavorites(data);
            } catch (error) {
                console.error(`Error fetchin favorites: ${error.message}`);
            }
        }
        fetchFavorites();
    }, []);
    const toggleFavorite = async (movie) => {
        const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);
        if (isFavorite) {
            const response = await fetch(`${BASE_URL}favorites/${movie.id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error(`Failed to delete favorite: ${response.statusText}`);
                return;
            }
            const updatedFavorites = await response.json();
            setFavorites(updatedFavorites);
            return;
        }

        const response = await fetch(`${BASE_URL}favorites/`, {
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
    const updateNote = async (movieId, newNote) => {
        try {
            const response = await fetch(`${BASE_URL}favorites/${movieId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ note: newNote }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const updatedFavorites = await response.json();
            setFavorites(updatedFavorites);
        } catch (error) {
            console.error(`Failed to update note: ${error.message}`);
        }
    };
    return { favorites, toggleFavorite, updateNote };
}
export { useFavorites };
