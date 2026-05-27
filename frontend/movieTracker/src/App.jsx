import { MovieList } from "./components/MovieList";
import { useMovie } from "./hooks/useMovie.js";
import styles from "./App.module.css";
import { useFavorites } from "./hooks/useFavorites.js";
import { useNotes } from "./hooks/useNotes.js";

function App() {
    const { movies } = useMovie();
    const { favorites, toggleFavorite, updateNote } = useFavorites();
    const { note, handleNoteChanging, clearNoteInput } = useNotes();
    // console.log(movies);
    // console.log(favorites);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Movies</h1>
            <hr />

            <h2 className={styles.subheading}>My favorites</h2>
            <MovieList
                movies={favorites}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                updateNote={updateNote}
                note={note}
                onNoteChange={handleNoteChanging}
                clearNoteInput={clearNoteInput}
                isFavoriteSection={true}
            />

            <hr />

            <h2 className={styles.subheading}>All Movies</h2>
            <MovieList movies={movies} favorites={favorites} onToggleFavorite={toggleFavorite} />
        </div>
    );
}

export default App;
