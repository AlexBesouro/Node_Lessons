import { MovieList } from "../components/MovieList";
import { useMovie } from "../hooks/useMovies";
import styles from "./Home.module.css";
import { Search } from "../components/Search";
import { BASE_URL } from "../hooks/useMovies";
function Home() {
    const { movies, setMovies } = useMovie();
    async function handleSearch(searchData) {
        try {
            const queryParams = new URLSearchParams();
            if (searchData.movieTitle) {
                queryParams.append("title", searchData.movieTitle);
            }
            if (searchData.movieYear) {
                queryParams.append("year", searchData.movieYear);
            }
            if (searchData.type) {
                queryParams.append("type", searchData.type);
            }
            const response = await fetch(`${BASE_URL}movies?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error(`Fetch failed: ${response.statusText}`);
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error("Searching error", error);
        }
    }
    return (
        <div className={styles["container"]}>
            <h1 className={styles["title"]}>Movies</h1>
            <Search onSearchSubmit={handleSearch} />
            <MovieList movies={movies} />
        </div>
    );
}

export default Home;
