import express from "express";
import { conexionDB } from "./config/db";
import routerAvistamientos from "./routes/api.router";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/avistamientos", routerAvistamientos);
await conexionDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
