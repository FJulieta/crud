import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db";
import authRoutes from "./routes/auth";

dotenv.config();
conectarDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en http://localhost:${PORT}`));
