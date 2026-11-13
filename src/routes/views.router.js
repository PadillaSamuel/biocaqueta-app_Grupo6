import { Router } from "express";
import { Avistamiento } from "../models/Avistamiento.js";
const router = Router();
const CATEGORIAS = ["Mamífero", "Ave", "Reptil", "Anfibio", "Flora"];
const ESTADOS = ["Preocupación menor", "Vulnerable", "En peligro"];

const opciones = (valores, seleccionado) =>
  valores.map((valor) => ({ valor, seleccionado: valor === seleccionado }));

router.get("/", async (req, res) => {
  try {
    const { categoria } = req.query;

    const filtro = {};

    if (categoria) filtro.categoria = categoria;

    const avistamientos = await Avistamiento.find(filtro)
      .sort({ fechaRegistro: "desc" })
      .lean();

    const lista = avistamientos.map((a) => ({
      ...a,
      fechaTexto: new Date(a.fechaRegistro).toLocaleDateString("es-CO"),
    }));

    res.render("home", {
      titulo: "Avistamientos",
      avistamientos: lista,
      categorias: opciones(CATEGORIAS),
      estados: opciones(ESTADOS, "Preocupación menor"),
      filtroCategorias: opciones(CATEGORIAS, categoria),
      categoriaFiltrada: categoria,
    });
  } catch (error) {
    res.status(500).send("Error al cargar los avistamientos");
  }
});

router.get("/editar/:id", async (req, res) => {
  try {
    const avistamiento = await Avistamiento.findById(req.params.id).lean();

    if (!avistamiento) {
      return res.status(404).send("Avistamiento no encontrado");
    }

    res.render("editar", {
      titulo: "Editar avistamiento",
      avistamiento,
      estados: opciones(ESTADOS, avistamiento.estadoConservacion),
    });
  } catch (error) {
    res.status(400).send("Id inválido");
  }
});
export default router;