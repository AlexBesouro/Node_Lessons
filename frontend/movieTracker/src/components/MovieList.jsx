import { MovieCard } from "./MovieCard";
import styles from "./MovieList.module.css";

function MovieList({ movies, favorites, onToggleFavorite }) {
    if (movies.length === 0) {
        return <p className={styles["no-movies"]}>List is empty</p>;
    }
    return (
        <div className={styles["list-container"]}>
            {movies.map((movie) => {
                const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);
                return (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    ></MovieCard>
                );
            })}
        </div>
    );
}
export { MovieList };
