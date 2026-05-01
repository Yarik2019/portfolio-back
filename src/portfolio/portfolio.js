import path from "node:path";

export const CLOUDINARY = {
  CLOUD_NAME: "CLOUD_NAME",
  API_KEY: "API_KEY",
  API_SECRET: "API_SECRET",
};

export const CONNECTION_DB = {
  MONGO_USER: "MONGO_USER",
  MONGO_PASSWORD: "MONGO_PASSWORD",
  MONGO_HOST: "MONGO_HOST",
  MONGO_DB_NAME: "MONGO_DB_NAME"
};

export const SMTP = {
  SMTP_HOST: "SMTP_HOST",
  SMTP_PORT: "SMTP_PORT",
  SMTP_USER: "SMTP_USER",
  SMTP_PASS: "SMTP_PASS",
  MAIL_TO: "MAIL_TO"
};

export const TWO_HOURS = 2 * 60 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), "src", "temp");

export const jsonPath = path.join(process.cwd(), "docs", "swagger.json");
export const yamlPath = path.join(process.cwd(), "docs", "openapi.yaml");
