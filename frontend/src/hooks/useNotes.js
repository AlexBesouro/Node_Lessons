import { useState } from "react";

function useNotes() {
    const [note, setNote] = useState({});
    const handleNoteChanging = (movieId, value) => {
        setNote((prev) => ({ ...prev, [movieId]: value }));
    };
    const clearNoteInput = (movieId) => {
        setNote((prev) => {
            const copy = { ...prev };
            delete copy[movieId];
            return copy;
        });
    };

    return { note, handleNoteChanging, clearNoteInput };
}

export { useNotes };
