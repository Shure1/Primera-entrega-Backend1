import express from "express";

//Modulos de rutas
import prodsRouter from "./routes/products.routes.js";
import CarritoRouter from "./routes/carrito.routes.js";

//verificador de rutas del pc
import { __dirname } from "./path.js";
//con path concatenamos dos rutas independientemente de la direccion de las barras del directorio
import path from "path";

//Puerto del server
const PORT = 4000;

//iniciamos el server
const app = express();

//Middlewares
app.use(express.json()); //para que podamos trabajar en json
app.use(express.urlencoded({ extended: true })); //para que podamos trabajar con querys largas

//rutas
app.use("/api/products", prodsRouter);
app.use("api/carrito", CarritoRouter);
app.use("/static", express.static(path.join(__dirname, "/public"))); //me evito el problema de la ruta en diferentes sist operativos u otros pc

console.log(__dirname);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
