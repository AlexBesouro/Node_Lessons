import { useState } from "react";
import styles from "./SearchById.module.css";

function SearchById({ onSearchSubmit }) {
    const [imdbId, setImdbId] = useState("");
    function handleChange(event) {
        setImdbId(event.target.value);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        onSearchSubmit(imdbId);
    }
    return (
        <form onSubmit={handleSubmit} className={styles["id-form"]}>
            <label htmlFor="imdbId">
                <input
                    type="text"
                    name="imdbId"
                    id="imdbId"
                    placeholder="Enter the movie' IMDB ID (e.g. tt1285016)..."
                    value={imdbId}
                    onChange={handleChange}
                    required
                    minLength={7}
                />
            </label>

            <button type="submit">Search</button>
        </form>
    );
}
export { SearchById };
