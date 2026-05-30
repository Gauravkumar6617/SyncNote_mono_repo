/**
 * CORS Middleware Configuration
 */

import cors from "cors";
import config from "../config/environment.js";

const corsOptions = {
  origin: config.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
