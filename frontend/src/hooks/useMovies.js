import { useState, useEffect } from "react";
import { BASE_URL } from "../config/api.js";
import { fetchMovies } from "../api/movieApi.js";

function useMovie(searchParams) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    useEffect(() => {
        let isMounted = true;
        async function loadMovies() {
            try {
                let data;
                if (searchParams.id) {
                    const response = await fetch(`${BASE_URL}movies/${searchParams.id}`);
                    const movieData = await response.json();
                    data = { movies: [movieData], totalResults: 1 };
                } else {
                    // debugger;

                    data = await fetchMovies({
                        title: searchParams.title,
                        year: searchParams.year,
                        type: searchParams.type,
                        page,
                    });
                }

                if (isMounted) {
                    setMovies(data.movies || []);
                    setTotalResults(Number(data.totalResults || 0));
                }
            } catch (error) {
                console.error(`Error in useMovie hook: ${error.message}`);
            }
        }
        loadMovies();
        return () => {
            isMounted = false;
        };
    }, [searchParams, page]);
    const nextPage = () => setPage((prev) => prev + 1);
    const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
    const totalPages = Math.ceil(totalResults / 10);
    return { movies, setMovies, page, setPage, totalPages, nextPage, prevPage, hasMovies: movies.length > 0 };
}

export { useMovie };
