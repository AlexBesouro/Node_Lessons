import styles from "./MovieCard.module.css";

function MovieCard({
    movie,
    isFavorite,
    onToggleFavorite,
    updateNote,
    note, // Объект со стейтами инпутов
    onNoteChange,
    clearNoteInput,
    isFavoriteSection,
}) {
    // Получаем текущее значение инпута именно для этого фильма
    const currentInputValue = note?.[movie.id] || "";

    return (
        <div className={styles["card-container"]}>
            <div className={styles["poster-container"]}>
                <img src={movie.poster || "https://via.placeholder.com/150"} alt={movie.title} />
            </div>
            <h3 className={styles["movie-title"]}>{movie.title}</h3>
            <p className={styles["movie-year"]}>{movie.year}</p>
            <p className={styles["personal-note"]}>Note: {movie.note || "N/A"}</p>

            <button className={styles["toggle-favorite-btn"]} onClick={() => onToggleFavorite(movie)}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>

            {/* Рендерим инпут и кнопку сохранения только в блоке избранного */}
            {isFavoriteSection && (
                <div className={styles["note-edit-container"]}>
                    <input
                        type="text"
                        className={styles["note-input"]}
                        placeholder="New note..."
                        value={currentInputValue}
                        onChange={(e) => onNoteChange(movie.id, e.target.value)}
                    />
                    <button
                        className={styles["save-note-btn"]}
                        onClick={async () => {
                            if (!currentInputValue.trim()) return;
                            await updateNote(movie.id, currentInputValue);
                            clearNoteInput(movie.id);
                        }}
                    >
                        Ok
                    </button>
                </div>
            )}
        </div>
    );
}

export { MovieCard };
