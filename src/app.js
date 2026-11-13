import express from "express";
import { conexionDB } from "./config/db.js";
import routerAvistamientos from "./routes/api.router.js";
import viewsRouter from "./routes/views.router.js";
const app = express();
const PORT = process.env.PORT || 3000;
import { engine } from "express-handlebars";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/avistamientos", routerAvistamientos);
app.use("/", viewsRouter);

await conexionDB();

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
