import { Avistamiento } from "../models/Avistamiento.js";
import { Router } from "express";

const router = Router();

const codigoError = (error) =>
  error.name === "ValidationError" || error.name === "CastError" ? 400 : 500;

router.get("/", async (req, res) => {
  try {
    const { categoria } = req.query;

    const filtro = {};

    if (categoria) filtro.categoria = categoria;

    const resultado = await Avistamiento.find(filtro).sort({ fechaRegistro: "desc" });

    res.status(200).send({ status: "success", data: resultado });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los avistamientos",
      detalle: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const resultado = await Avistamiento.create(req.body);

    const esFormulario = req.headers["content-type"]?.includes(
      "application/x-www-form-urlencoded",
    );

    if (esFormulario) return res.redirect("/");

    res.status(201).send({ status: "success", data: resultado });
  } catch (error) {
    res.status(codigoError(error)).json({
      error: "Error al guardar los avistamientos",
      detalle: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resultado = await Avistamiento.findByIdAndDelete(req.params.id);
    if (!resultado)
      return res.status(404).send({ message: "Avistamiento no encontrado" });

    res.status(200).send({ status: "success", data: resultado });
  } catch (error) {
    res.status(codigoError(error)).json({
      error: "Error al eliminar los avistamientos",
      detalle: error.message,
    });
  }
});
router.post("/delete/:id", async (req, res) => {
  try {
    const resultado = await Avistamiento.findByIdAndDelete(req.params.id);
    if (!resultado)
      return res.status(404).send({ message: "Avistamiento no encontrado" });

    res.redirect("/");
  } catch (error) {
    res.status(codigoError(error)).json({
      error: "Error al eliminar los avistamientos",
      detalle: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { estadoConservacion, zona } = req.body ?? {};
    const resultado = await Avistamiento.findByIdAndUpdate(
      req.params.id,
      { estadoConservacion, zona },
      { new: true, runValidators: true },
    );
    if (!resultado)
      return res.status(404).send({ message: "Avistamiento no encontrado" });

    res.status(200).send({ status: "success", data: resultado });
  } catch (error) {
    res.status(codigoError(error)).json({
      error: "Error al actualizar los avistamientos",
      detalle: error.message,
    });
  }
});
router.post("/update/:id", async (req, res) => {
  try {
    const { estadoConservacion, zona } = req.body ?? {};
    await Avistamiento.findByIdAndUpdate(
      req.params.id,
      { estadoConservacion, zona },
      { runValidators: true },
    );
    res.redirect("/");
  } catch (error) {
    res.status(codigoError(error)).json({
      error: "Error al actualizar los avistamientos",
      detalle: error.message,
    });
  }
});

export default router;
