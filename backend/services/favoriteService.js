import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, "../..", "database", "mockDB.json");
async function readFavorites() {
    try {
        const rawData = await fs.readFile(filePath, "utf-8");
        if (!rawData.trim()) {
            return [];
        }
        const data = JSON.parse(rawData);
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error(`Error file reading, ${error.message}`);
        return [];
    }
}
// console.log(await readFavorites());

async function writeFavorites(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");
    } catch (error) {
        console.error(`Error file writing, ${error.message}`);
        throw error;
    }
}
export { readFavorites, writeFavorites };
