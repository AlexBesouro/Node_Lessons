import { MovieList } from "./components/MovieList";
import { useMovie } from "./hooks/useMovie.js";
import styles from "./App.module.css";

function App() {
    const { movies, favorites, toggleFavorite } = useMovie();

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Movies</h1>
            <hr />

            <h2 className={styles.subheading}>My favorites</h2>
            <MovieList movies={favorites} favorites={favorites} onToggleFavorite={toggleFavorite} />

            <hr />

            <h2 className={styles.subheading}>All Movies</h2>
            <MovieList movies={movies} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
    );
}

export default App;
