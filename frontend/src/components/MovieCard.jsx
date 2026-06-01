import styles from "./MovieCard.module.css";
import { AddToFavoritesBtn } from "./AddToFavoritesBtn";

function MovieCard({ movie }) {
    return (
        <div className={styles["card-container"]}>
            <div className={styles["poster-container"]}>
                <img
                    src={
                        movie.poster && movie.poster !== "N/A"
                            ? movie.poster
                            : "https://placehold.co/300x450?text=No+Poster"
                    }
                    alt={movie.title}
                />
            </div>
            <h3 className={styles["movie-title"]}>{movie.title}</h3>
            <p className={styles["movie-year"]}>{movie.year}</p>
            <p className={styles["movie-type"]}>{movie.type}</p>
            <span>
                <AddToFavoritesBtn movie={movie} />
            </span>
        </div>
    );
}

export { MovieCard };
