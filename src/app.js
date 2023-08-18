import { promises as fs } from "fs";
import express from "express";
import ProductManager from "./main";

const ProductManagerServer = new ProductManager();

const products = async () => {
  try {
    const prodsJson = JSON.parse(
      await fs.readFile("./productos.json", "utf-8")
    );

    return prodsJson;
  } catch (error) {
    console.log("error en consultar", error);
  }
};

/* console.log(productos); */

const PORT = 4000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hola, buenos dias");
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  const productos = await ProductManagerServer.getProducts();
  console.log(limit);
  if (limit) {
    const filterProducts = productos.slice(0, parseInt(limit));
    /* const filteredProducts = productos.filter((prod) => prod.title === title); */
    console.log(filterProducts);

    res.status(200).send(filterProducts);
  } else {
    res.status(200).send(productos);
  }
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await ProductManagerServer.getProductById(id);
  const prod = productos.find((prod) => prod.id === parseInt(id));
  prod
    ? res.status(200).send(prod)
    : res.status(404).send("producto no encontrado");
});

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
