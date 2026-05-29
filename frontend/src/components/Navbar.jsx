import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
    const getLinkClass = ({ isActive }) => (isActive ? styles["active"] : styles["link"]);

    return (
        <nav className={styles["navigation"]}>
            <NavLink to="/" end className={getLinkClass}>
                Home
            </NavLink>
            <NavLink to="/favorites" className={getLinkClass}>
                Favorites
            </NavLink>
        </nav>
    );
}

export { Navbar };
