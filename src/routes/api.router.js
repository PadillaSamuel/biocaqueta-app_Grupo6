import { Avistamiento } from "../models/Avistamiento";
import { Router } from "express";

const router = Router();

router.get("", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los avistamientos",
      detalle: error.message,
    });
  }
});

router.post("", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error al guardar los avistamientos",
      detalle: error.message,
    });
  }
});

router.delete("/:id", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar los avistamientos",
      detalle: error.message,
    });
  }
});
router.post("/delete/:id", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error al elimar los avistamientos",
      detalle: error.message,
    });
  }
});

router.put("/:id", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar los avistamientos",
      detalle: error.message,
    });
  }
});
router.post("/update/:id", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar los avistamientos",
      detalle: error.message,
    });
  }
});

export default router;
