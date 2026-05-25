import "dotenv/config";
import express from "express"; // express is a function to create an express application
import cors from "cors"; // cors is a middleware to enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins
import { router } from "./routes/filmRoutes.js";
const app = express(); // create an express application
app.use(cors()); // enable CORS for all routes
app.use(express.json()); // middleware to parse JSON bodies of incoming requests

app.use("/api", router); // use the router for all routes starting with /api

const PORT = process.env.PORT || 5000; // set the port to the value of the environment variable PORT or default to 5000

app.listen(PORT, () => {
    {
        console.log("Server FilmTracker is running on http://localhost:" + PORT);
    }
});
