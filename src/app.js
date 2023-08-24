import express from "express";

//Modulos de rutas
import prodsRouter from "./routes/products.routes.js";
import carritoRouter from "./routes/carrito.routes.js";

//multer para subir imagenes
import multer from "multer";

//engine para crear plantillas en handlebars
import { engine } from "express-handlebars";

import { Server } from "socket.io";

//verificador de rutas del pc
import { __dirname } from "./path.js";
//con path concatenamos dos rutas independientemente de la direccion de las barras del directorio
import path from "path";

//Puerto del server
const PORT = 4000;

//iniciamos el server
const app = express();

//Configuracion de multer
const storage = multer.diskStorage({
  /* definimos donde guardaremos la imagen */
  destination: (req, file, cb) => {
    cb(null, "src/public/img"); //null hace referencia a que no envia errores
  },
  filename: (req, file, cb) => {
    //le ponemos la fecha mas el nombre concatenado del archivo para hacerlos unicos
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const server =
  //Middlewares
  app.use(express.json()); //para que podamos trabajar en json
app.use(express.urlencoded({ extended: true })); //para que podamos trabajar con querys largas
const upload = multer({ storage: storage }); //aplicamos la config multer

//rutas
app.use("/api/products", prodsRouter);
app.use("/api/carrito", carritoRouter);
app.engine("handlebars", engine()); //Defino que motor de plantillas voy a utilizar y su config
app.set("view engine", "handlebars"); //Setting de mi app de hbs
app.set("views", path.resolve(__dirname, "./views")); //Resolver rutas absolutas a traves de rutas relativas
app.use("/static", express.static(path.join(__dirname, "/public"))); //me evito el problema de la ruta en diferentes sist operativos u otros pc y sirve para ocupar la carpeta public para el handlebars

//aplicamos el middleware multer que se aplica a nivel de endpoint
app.post("/upload", upload.single("product"), (req, res) => {
  //metodo single especifica que subiremos una sola imagen llamada product
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("imagen cargada");
});

app.get("/static", (req, res) => {
  /* podemos inicializar variables y entregarselas a la plantilla que se renderice que en este caso es home */
  const user = {
    nombre: "maria",
    cargo: "tutor",
  };

  const cursos = [
    { numCurso: 123, dia: "S", horario: "Mañana" },
    { numCurso: 456, dia: "MyJ", horario: "Tarde" },
    { numCurso: 789, dia: "LyM", horario: "Noche" },
  ];
  /* bosy tomara la pantilla que se renderice aca en este caso home */
  res.render("home", {
    user: user,
    css: "stylePublic.css",
    title: "Home",
    esTutor: user.cargo === "tutor",
    cursos: cursos,
  });
});

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
