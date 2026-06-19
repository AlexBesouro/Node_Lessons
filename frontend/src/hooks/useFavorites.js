import { useState, useEffect } from "react";
import { BASE_URL } from "../config/api";

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
                // console.log(data);
                setFavorites(data);
            } catch (error) {
                console.error(`Error fetchin favorites: ${error.message}`);
            }
        }
        fetchFavorites();
    }, []);

    return { favorites };
}
export { useFavorites };
