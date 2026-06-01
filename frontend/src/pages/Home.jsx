import { MovieList } from "../components/MovieList";
import { useMovie } from "../hooks/useMovies";
import styles from "./Home.module.css";
import { Search } from "../components/Search";
import { useState } from "react";
import { SearchById } from "../components/SearchByID";
const popularKeywords = [
    "space",
    "world",
    "star",
    "man",
    "love",
    "dark",
    "king",
    "dead",
    "night",
    "last",
    "black",
    "war",
    "time",
    "agent",
];
const randomKeyword = popularKeywords[Math.floor(Math.random() * popularKeywords.length)];
function Home() {
    const [searchParams, setSearchParams] = useState({ title: randomKeyword, year: null, type: null, id: null });
    const { movies, page, setPage, totalPages, nextPage, prevPage, hasMovies } = useMovie(searchParams);
    function handleSearch(searchData) {
        setPage(1);
        setSearchParams({
            title: searchData.movieTitle || "",
            year: searchData.movieYear || "",
            type: searchData.type || "",
            id: null,
        });
    }
    async function handleSearchById(imdbId) {
        setPage(1);
        setSearchParams({
            title: null,
            year: null,
            type: null,
            id: imdbId,
        });
    }
    return (
        <div className={styles["container"]}>
            <h1 className={styles["title"]}>Movies</h1>
            <Search onSearchSubmit={handleSearch} />
            <SearchById onSearchSubmit={handleSearchById} />
            <MovieList movies={movies} />
            {hasMovies && !searchParams.id && (
                <div className={styles["pagination"]}>
                    <button onClick={prevPage} disabled={page === 1}>
                        Prev
                    </button>
                    <span>{page}</span>
                    <button onClick={nextPage} disabled={page >= totalPages}>
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
