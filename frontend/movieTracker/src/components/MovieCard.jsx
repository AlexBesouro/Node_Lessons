import styles from "./MovieCard.module.css";

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
    return (
        <div className={styles["card-container"]}>
            <div className={styles["poster-container"]}>
                <img src={movie.poster || "https://via.placeholder.com/150"} alt={movie.title} />
            </div>
            <h3 className={styles["movie-title"]}>{movie.title}</h3>
            <p className={styles["movie-year"]}>{movie.year}</p>
            <button className={styles["toggle-favorite-btn"]} onClick={() => onToggleFavorite(movie)}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
        </div>
    );
}

export { MovieCard };
