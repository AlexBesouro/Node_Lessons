import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";

import "./App.css";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Favorites"));

function App() {
    return (
        <Suspense fallback={<p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/favorites" element={<Favorites />}></Route>
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
