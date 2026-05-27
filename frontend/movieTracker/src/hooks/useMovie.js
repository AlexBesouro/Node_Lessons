import { useState, useEffect } from "react";
const BASE_URL = `${import.meta.env.VITE_API_PATH}${import.meta.env.VITE_API_PORT}api/`;
function useMovie() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch(`${BASE_URL}movies`);
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

    return { movies };
}
export { useMovie, BASE_URL };
