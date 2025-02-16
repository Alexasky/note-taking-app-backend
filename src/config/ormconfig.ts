import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from '../entities/User';
import { Note } from '../entities/Note';
import { RefreshToken } from '../entities/RefreshToken';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "site1234",
  database: process.env.DB_NAME || "notes_app",
  synchronize: false,
  logging: true,
  entities: [User, Note, RefreshToken],
  migrations: ["src/migrations/*.ts"],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};