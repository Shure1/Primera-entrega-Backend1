import { Router } from "express";
import { ProductManager, CarritoManager } from "../main";

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
  const productos = await ProductManagerServer.getProductById(id);
  const prod = productos.find((prod) => prod.id === parseInt(id));
  prod
    ? res.status(200).send(prod)
    : res.status(404).send("producto no encontrado");
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

prodsRouter.post("/carrito", async (req, res) => {
  const add = await CarritoManager.AddCarrito(req.body);
  add && res.status(200).send("producto creado");
});

prodsRouter.get("/carrito/:id", async (req, res) => {
  const { id } = req.params;
  const carrito = await CarritoManager.getCarrito(id);
  const carr = carrito.find((carr) => carr.id === parseInt(id));
  carr
    ? res.status(200).send(carr)
    : res.status(404).send("producto no encontrado");
});

prodsRouter.post("/carrito/:idc/producto/idp", async (req, res) => {
  const { idc, idp } = req.body;

  const prodAdd = await CarritoManager.addProduct(idp, idc);
  try {
    prodAdd
      ? res.status(200).send(prodAdd)
      : res.status(404).send("producto no encontrado");
  } catch (error) {
    console.log("no se pudo ingresar el producto: ", error);
  }
});
export default prodsRouter;
