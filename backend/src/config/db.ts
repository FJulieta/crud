import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar MongoDB:", error);
        process.exit(1);
    }
};

export default conectarDB;