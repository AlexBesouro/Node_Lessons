import { useState } from "react";
import styles from "./Search.module.css";

function Search({ onSearchSubmit }) {
    const [searchData, setSearchData] = useState({
        movieTitle: "",
        movieYear: "",
        type: "",
    });
    function handleChange(event) {
        const { name, value } = event.target;
        setSearchData((prev) => ({ ...prev, [name]: value }));
    }
    async function handleSubmit(event) {
        event.preventDefault();
        onSearchSubmit(searchData);
    }
    return (
        <form onSubmit={handleSubmit} className={styles["search-form"]}>
            <label htmlFor="movieTitle">
                <input
                    type="text"
                    name="movieTitle"
                    id="movieTitle"
                    placeholder="Enter the movie title..."
                    value={searchData.movieName}
                    onChange={handleChange}
                    required
                    minLength={3}
                />
            </label>
            <label htmlFor="movieYear">
                <input
                    type="number"
                    name="movieYear"
                    value={searchData.movieYear}
                    onChange={handleChange}
                    placeholder="Enter the movie's year..."
                    min="1920"
                    max="2026"
                />
            </label>
            <label htmlFor="type">
                <select name="type" id="type" value={searchData.type} onChange={handleChange}>
                    <option value="">All</option>
                    <option value="movies">Movies</option>
                    <option value="series">Series</option>
                </select>
            </label>
            <button type="submit">Search</button>
        </form>
    );
}
export { Search };
