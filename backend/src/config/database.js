/**
 * Database Configuration
 * Setup database connection based on environment
 */

import config from "./environment.js";

const databaseConfig = {
  development: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
  },
  production: {
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
  },
};

export default databaseConfig[config.NODE_ENV] || databaseConfig.development;
