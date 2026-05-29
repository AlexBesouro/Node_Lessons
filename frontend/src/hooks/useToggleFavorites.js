import { BASE_URL } from "./useMovies";
import { useState, useEffect } from "react";

function useToggleFavorites(movie) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function checkFavoriteStatus() {
            try {
                const response = await fetch(`${BASE_URL}favorites`);
                if (response.ok) {
                    const favorites = await response.json();
                    const found = favorites.some((fav) => fav.id === movie.id);
                    setIsFavorite(found);
                }
            } catch (error) {
                console.error("Ошибка проверки статуса избранного:", error);
            }
        }
        if (movie?.id) checkFavoriteStatus();
    }, [movie?.id]);

    const toggleFavorite = async (movie) => {
        console.log(movie);
        if (isFavorite) {
            const response = await fetch(`${BASE_URL}favorites/${movie.id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                console.error(`Failed to delete favorite: ${response.statusText}`);
                return;
            }
            setIsFavorite(false);
            return;
        }

        const response = await fetch(`${BASE_URL}favorites`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(movie),
        });
        if (!response.ok) {
            console.error(`Failed to add favorite: ${response.statusText}`);
            return;
        }
        setIsFavorite(true);
    };
    return { toggleFavorite, isFavorite };
}
export { useToggleFavorites };

// const updateNote = async (movieId, newNote) => {
//     try {
//         const response = await fetch(`${BASE_URL}favorites/${movieId}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ note: newNote }),
//         });
//         if (!response.ok) {
//             throw new Error(`Error: ${response.statusText}`);
//         }
//         const updatedFavorites = await response.json();
//         setFavorites(updatedFavorites);
//     } catch (error) {
//         console.error(`Failed to update note: ${error.message}`);
//     }
// };
