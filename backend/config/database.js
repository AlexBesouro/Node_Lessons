import mysql2 from "mysql2/promise";
import { PrismaClient } from "../../prisma/generated/prisma/index.js";

const prisma = new PrismaClient();

// const pool = mysql2.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT || 3306,
//     connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
// });

async function testConnection() {
    try {
        await prisma.$connect();
        console.log("   Connexion MySQL successful !");
        console.log(`   Data base: ${process.env.DB_NAME}`);
        console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
        return true;
    } catch (error) {
        console.error("Connexion error MySQL:");
        const errorCode = error.code || error.errorCode;
        switch (errorCode) {
            case "P1001": // Код Prisma: Can't reach database server
            case "ECONNREFUSED":
                console.error("   → MySQL not started or impossible to reach");
                console.error("   → Start MySQL Server and verify host/port in .env");
                break;
            case "P1010": // Код Prisma: User denied access
            case "ER_ACCESS_DENIED_ERROR":
                console.error("   → Access refused (user/password incorrect)");
                console.error("   → Verify DB credentials in DATABASE_URL inside .env");
                break;
            case "P2024": // Код Prisma: Connection timeout
            case "ETIMEDOUT":
                console.error("   → Connection timeout reached");
                break;
            default:
                console.error(`   → ${error.message}`);
        }

        return false;
    }
}
export { prisma, testConnection };
