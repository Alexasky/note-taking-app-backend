import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { connectDB } from "./config/typeorm.config";
import cors from 'cors';
import { authRoutes } from "./auth/auth.module";
import { noteRoutes } from './note/note.module';


dotenv.config();
export const app = express();
app.use(express.json());

const corsOptions = {
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api", noteRoutes);

connectDB();

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}