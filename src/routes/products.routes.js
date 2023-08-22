import { Router } from "express";
import { ProductManager } from "./main.js";

const prodsRouter = Router();
const ProductManagerServer = new ProductManager();

prodsRouter.get("/", async (req, res) => {
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

prodsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await ProductManagerServer.getProductById(parseInt(id));
  res.status(200).send(productos);
  /* const prod = productos.find((prod) => prod.id === parseInt(id));
  prod
    ? res.status(200).send(productos)
    : res.status(404).send("producto no encontrado"); */
});

prodsRouter.post("/", async (req, res) => {
  const { id } = req.body;

  //!crear un getproductbyCode(code) para usarlo aca y no el buscar por id
  const confirmacion = await ProductManagerServer.getProductById(parseInt(id));

  if (confirmacion) {
    req.status(200).send("producto ya creado");
  } else {
    const add = await ProductManagerServer.addProduct(req.body);
    add && res.status(200).send("producto creado");
  }
});

prodsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  const confirmacion = await ProductManagerServer.getProductById(parseInt(id));

  if (confirmacion) {
    await ProductManagerServer.uptadeProduct(id, req.body);
    res.status(200).send("producto creado");
  } else {
    res.status(404).send("producto no encontrado");
  }
});

prodsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const confirmacion = await ProductManagerServer.getProductById(parseInt(id));

  if (confirmacion) {
    await ProductManagerServer.deleteProduct(parseInt(id));
    res.status(200).send("producto eliminado");
  } else {
    res.status(404).send("producto no encontrado");
  }
});

export default prodsRouter;
