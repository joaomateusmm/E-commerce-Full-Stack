// drizzle.config.ts

import "dotenv/config"; // Carrega as variáveis de .env

import { defineConfig } from "drizzle-kit";

// Validação para garantir que a URL do banco de dados existe
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in the .env file");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
