import { Router } from "express";
import { CarritoManager } from "./main.js";

const CarritoRouter = Router();
const CarritoManagerServer = new CarritoManager();

CarritoRouter.post("/carrito", async (req, res) => {
  const add = await CarritoManagerServer.AddCarrito(req.body);
  add && res.status(200).send("producto creado");
});

CarritoRouter.get("/carrito/:id", async (req, res) => {
  const { id } = req.params;
  const carrito = await CarritoManagerServer.getCarrito(parseInt(id));
  const carr = carrito.find((carr) => carr.id === parseInt(id));
  carr
    ? res.status(200).send(carr)
    : res.status(404).send("producto no encontrado");
});

CarritoRouter.post("/carrito/:idc/producto/idp", async (req, res) => {
  const { idc, idp } = req.body;

  const prodAdd = await CarritoManagerServer.addProduct(
    parseInt(idp),
    parseInt(idc)
  );
  try {
    prodAdd
      ? res.status(200).send(prodAdd)
      : res.status(404).send("error en ingresar el producto");
  } catch (error) {
    console.log("no se pudo ingresar el producto: ", error);
  }
});
export default CarritoRouter;
