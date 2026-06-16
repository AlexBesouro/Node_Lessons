import "dotenv/config";
import express from "express"; // express is a function to create an express application
import cors from "cors"; // cors is a middleware to enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins
import { router } from "./routes/filmRoutes.js";
import mysql2 from "mysql2";
const app = express(); // create an express application
// app.use(cors()); // enable CORS for all routes
const allowedOrigins = process.env.FRONT_URL || "http://localhost:5173";

const corsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // middleware to parse JSON bodies of incoming requests

app.use("/api", router); // use the router for all routes starting with /api

const PORT = process.env.PORT || 5000; // set the port to the value of the environment variable PORT or default to 5000

const mysql = mysql2;

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("Connection error: " + err.stack);
        return;
    }
    console.log("Connected to MySQL!");
});

app.listen(PORT, () => {
    {
        console.log("Server FilmTracker is running on http://localhost:" + PORT);
        console.log(`Environnement : ${process.env.NODE_ENV}`);
        console.log(`Origines CORS autorisées :`);
        console.log("─────────────────────────────────");
    }
});
