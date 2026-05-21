// const express = require("express"); depricated
import express from "express";
const app = express();

const FILMS = [
    {
        id: 1,
        title: "Inception",
        release_year: 2010,
        director: "Christopher Nolan",
        category_name: "Science-Fiction",
    },
    {
        id: 2,
        title: "The Dark Knight",
        release_year: 2008,
        director: "Christopher Nolan",
        category_name: "Action",
    },
    {
        id: 3,
        title: "Interstellar",
        release_year: 2014,
        director: "Christopher Nolan",
        category_name: "Science-Fiction",
    },
];

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.json({
        message: "Hello from FilmTracker API!",
        author: "Alex",
    });
});
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        message: "API FilmTracker works fine",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
});

app.get("/api/films/", (req, res) => {
    res.json({
        success: true,
        count: FILMS.length,
        data: FILMS,
    });
});

app.get("/api/categories", (req, res) => {
    const categories = [
        { id: 1, name: "Action" },
        { id: 2, name: "Science-Fiction" },
        { id: 3, name: "Drame" },
    ];
    res.json({
        success: true,
        categories: categories.map((cat) => cat.name),
    });
});

app.get("/api/debug/:id", (req, res) => {
    res.json({
        method: req.method,
        url: req.url,
        path: req.path,
        params: req.params,
        query: req.query,
        body: req.body,
        headers: req.headers,
        ip: req.ip,
    });
});

app.get("/api/film/:id", (req, res) => {
    const filmID = req.params.id;
    const film = FILMS.find((f) => f.id === Number(filmID));
    if (film) {
        return res.json({
            success: true,
            data: film,
        });
    } else {
        return res.status(404).json({
            success: false,
            message: `Film with id ${filmID} not found`,
        });
    }
});

app.get("/api/health", (req, res) => {
    const memoryUsage = process.memoryUsage();
    const isHealthy = memoryUsage.heapUsed < 100 * 1024 * 1024;

    if (!isHealthy) {
        // Отдаем статус 503 (Сервис недоступен), чтобы хостинг автоматически перезапустил сервер
        return res.status(503).json({
            success: false,
            status: "Unhealthy",
            error: "Memory limit exceeded",
        });
    }

    res.json({
        success: true,
        status: "OK",
        heapUsedMB: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    });
});

app.get("/api/process-debug", (req, res) => {
    // В process есть круговые ссылки, поэтому напрямую в res.json() его совать нельзя.
    // Выведем основные ключи объекта:
    res.json({
        platform: process.platform,
        version: process.version,
        env: process.env,
        arch: process.arch,
        pid: process.pid,
        uptime: process.uptime(),
    });
});

app.use(express.json());
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found",
        message: `Route ${req.method} ${req.url} doesn't exist`,
        availableRoutes: ["GET /", "GET /api/status", "GET /api/films", "GET /api/categories", "GET /api/film/id"],
    });
});

app.listen(PORT, () => {
    console.log(`Server is started on http://localhost:${PORT}`);
});
