import mongoose from "mongoose";

const avistamientoSchema = new mongoose.Schema({
  nombreComun: {
    type: String,
    required: true,
    trim: true,
  },
  nombreCientifico: {
    type: String,
    required: true,
    trim: true,
  },
  categoria: {
    type: String,
    required: true,
    enum: ["Mamífero", "Ave", "Reptil", "Anfibio", "Flora"],
  },
  zona: {
    type: String,
    required: true,
    trim: true,
  },
  estadoConservacion: {
    type: String,
    enum: ["Preocupación menor", "Vulnerable", "En peligro"],
    default: "Preocupación menor",
  },
  investigador: {
    type: String,
    required: true,
    trim: true,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

export const Avistamiento = mongoose.model("Avistamiento", avistamientoSchema);
