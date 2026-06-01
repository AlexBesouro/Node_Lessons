import { MovieList } from "../components/MovieList";
import styles from "./Favorites.module.css";
import { useFavorites } from "../hooks/useFavorites";
function Favorites() {
    const { favorites } = useFavorites();
    // console.log(movies);
    return (
        <div className={styles["container"]}>
            <h1 className={styles["title"]}>My Favorite Movies</h1>
            <MovieList movies={favorites} />
        </div>
    );
}

export default Favorites;
