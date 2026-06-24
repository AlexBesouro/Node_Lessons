import { prisma } from "../config/database.js";
const getHealth = async (req, res) => {
    try {
        const rows = await prisma.$queryRaw("SELECT 1");
        res.json({
            status: "ok",
            database: "connected",
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            database: "disconnected",
            error: error.message,
        });
    }
};

export { getHealth };
