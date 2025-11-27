import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado.");
  } catch (err) {
    console.error("Erro ao conectar com MongoDB:", err);
  }
};


