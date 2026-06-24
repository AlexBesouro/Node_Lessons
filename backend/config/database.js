import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10,
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log("   Connexion MySQL successful !");
        console.log(`   Data base: ${process.env.DB_NAME}`);
        console.log(`   Host: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
        connection.release();
        return true;
    } catch (error) {
        console.error("Connexion error MySQL:");

        switch (error.code) {
            case "ECONNREFUSED":
                console.error("   → MySQL not started");
                console.error("   → Start MySQL Server");
                break;
            case "ER_ACCESS_DENIED_ERROR":
                console.error("   → Access refused(user/password incorrect)");
                console.error("   → Verify DB_USER end DB_PASSWORD in .env");
                break;
            case "ER_BAD_DB_ERROR":
                console.error(`   → BD "${process.env.DB_NAME}" doesn't exist`);
                console.error("   → Create BD");
                break;
            case "ETIMEDOUT":
                console.error("   → Impossible to reach the server MySQL");
                console.error("   → Verify DB_HOST and DB_PORT in .env");
                break;
            default:
                console.error(`   → ${error.message}`);
        }

        return false;
    }
}

export { pool, testConnection };
