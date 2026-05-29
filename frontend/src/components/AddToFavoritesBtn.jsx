import { useToggleFavorites } from "../hooks/useToggleFavorites";
import styles from "./AddToFavoritesBtn.module.css";

function AddToFavoritesBtn({ movie }) {
    const { isFavorite, toggleFavorite } = useToggleFavorites(movie);

    return (
        <button
            onClick={() => toggleFavorite(movie)}
            className={`${styles["favorite-btn"]} ${isFavorite ? styles.active : ""}`}
        >
            {isFavorite ? "⭐" : "☆"}
        </button>
    );
}
export { AddToFavoritesBtn };
