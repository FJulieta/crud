import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const conectarDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            throw new Error("❌ ERROR: La URI de MongoDB no está definida en el archivo .env");
        }

        await mongoose.connect(uri);
        console.log("✅ Conectado a MongoDB Local");
    } catch (error) {
        console.error("❌ Error al conectar MongoDB:", error);
        process.exit(1);
    }
};

export default conectarDB;
