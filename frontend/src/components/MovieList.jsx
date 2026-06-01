import { MovieCard } from "./MovieCard";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p className={styles["no-movies"]}>List is empty</p>;
    }
    return (
        <div className={styles["list-container"]}>
            {movies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie}></MovieCard>;
            })}
        </div>
    );
}
export { MovieList };
