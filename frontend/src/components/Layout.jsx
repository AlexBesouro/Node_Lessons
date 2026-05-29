import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { Navbar } from "./Navbar";

function Layout() {
    return (
        <div className={styles["layout"]}>
            <header className={styles["header"]}>
                <p> My first full project</p>
                <div className={styles["headerContent"]}>
                    <Navbar />
                </div>
            </header>

            <main className={styles["main"]}>
                <div className={styles["container"]}>
                    <Outlet />
                </div>
            </main>

            <footer className={styles["footer"]}>
                <p>&copy; 2026 Table Board System</p>
            </footer>
        </div>
    );
}

export { Layout };
