// eslint-disable-next-line @typescript-eslint/no-require-imports
const config = process.env.NODE_ENV !== "production" ? require("dotenv") : null;
if (config) {
    config.config();
}

const ENVIRONMENT = process.env.NODE_ENV || "development";
const PORT = process.env.PORT || 4444;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const GEOCODING_API_URL = process.env.GEOCODING_API_URL;

if (!TOKEN_SECRET || !GEOCODING_API_URL) {
    console.error("Missing environment variables");
    process.exit(1);
}

export {
    ENVIRONMENT,
    PORT,
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    TOKEN_SECRET,
    GEOCODING_API_URL
};
