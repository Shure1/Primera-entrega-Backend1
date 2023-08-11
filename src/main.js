import { promises as fs } from "fs";

class ProductManager {
  constructor() {
    this.path = "./productos.json";
  }

  async addProduct(product) {
    const prodsJson = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prodFilter = prodsJson.find((prod) => prod.code === product.code);

    if (prodFilter) {
      console.log("Producto ya encontrado");
      return;
    } else {
      prodsJson.push(product);
      /* pasamos de objeto a texto plano (stringify) */
      await fs.writeFile(this.path, JSON.stringify(prodsJson));
    }
  }

  async getProducts() {
    const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(products);
  }

  async getProductById(id) {
    const prodsJson = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const prod = prodsJson.find((prod) => prod.id === id);

    if (prod) {
      console.log(prod);
    } else {
      console.log("Producto no encontrado");
    }
  }

  async uptadeProduct(id, actualizacion) {
    /* pasamos de texto plano a objeto (parse) */
    const prodsJson = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const productoIndice = prodsJson.findIndex(
      (producto) => producto.id === id
    );
    if (productoIndice != 1) {
      /* si hay una propiedad distinta lo sobreescribe, sino lo deja tal como esta */
      prodsJson[productoIndice] = {
        ...prodsJson[productoIndice],
        ...actualizacion,
      };
      await fs.writeFile(this.path, JSON.stringify(prodsJson));
    } else {
      console.log("producto no encontrado");
    }
  }

  /* Manera de actualizar mas de un campo a la vez (no se si esta bien o si se puede hacer de otra forma)
    uptadeProduct(id,actualizaciones){

        const producto = this.products.find(producto => producto.id === id)
        Object.assign(producto, actualizaciones);


    } */

  async deleteProduct(id) {
    let prodsJson = JSON.parse(await fs.readFile(this.path, "utf-8"));
    const verificar = prodsJson.find((producto) => producto.id === id);

    !verificar ||
      (prodsJson = prodsJson.filter((productos) => productos.id !== id));
    await fs.writeFile(this.path, JSON.stringify(prodsJson));

    if (!verificar) {
      console.log("error de id");
    }
  }
}

class Product {
  constructor(title, description, price, code, stock, thumbnail) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.code = code;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.id = Product.incrementarId(); //Mi Id es el resultado de lo que devuelva este metodo
  }
  //Defino un metodo de CLASE
  static incrementarId() {
    //Si existe esta propiedad, la aumento en 1 o la creo
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }
}

const producto1 = new Product("Arroz", "Rico", 300, "AA123LE", 20, []);
const producto2 = new Product("Lentejas", "Ricas", 300, "LL123LE", 20, []);
const producto3 = new Product("Garbanzos", "Rico", 300, "GG123LE", 20, []);

const productManager = new ProductManager();

const manageProducts = async () => {
  await productManager.addProduct(producto1);
  await productManager.addProduct(producto2);
  await productManager.addProduct(producto3);

  await productManager.getProducts();

  await productManager.uptadeProduct(1, { title: "pan" });
  await productManager.deleteProduct(1);
  await productManager.getProducts();
};
/* 
manageProducts(); */
console.log("hola");
