import mongoose from "mongoose";

export const conexionDB = async () => {
  const uri = process.env.URI_MONGO_ATLAS;
  if (!uri) {
    console.error("Falta URI_MONGO_ATLAS en .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log(
      `MongoDB conectado: ${mongoose.connection.host}/${mongoose.connection.name}`,
    );
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};
