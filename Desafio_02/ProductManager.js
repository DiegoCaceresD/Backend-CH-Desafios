class Producto {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  static id = 0;
  #productos;
  #filePath;
  #dirPath;
  #fileSystem;
  constructor() {
    ProductManager.id;
    this.#productos = new Array();
    this.#dirPath = "./file";
    this.#filePath = this.#dirPath + "/Products.json";
    this.#fileSystem = require("fs");
  }

  //vamos a trabajar con promesas por lo que necesito generar un ambiente asincronico
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++;
    let nuevoProducto = new Producto(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      Producto.id
    );
    console.log("Nuevo producto: ", nuevoProducto);

    try {
      // creamos el directorio
      await this.#fileSystem.promises.mkdir(this.#dirPath, { recursive: true });

      //valido si ya existe el archivo con productos
      if (!this.#fileSystem.existsSync(this.#filePath)) {
        //le paso un array vacio en string porque write file recibe string
        await this.#fileSystem.promises.writeFile(this.#filePath, "[]");
      }

      // leo los productos encontrados
      let productos = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      );

      //agrego el nuevo producto al archivo
      this.#productos = JSON.parse(productos);
      this.#productos.push({
        id: ProductManager.id,
        ...nuevoProducto,
      });

      await this.#fileSystem.promises.writeFile(
        this.#filePath,
        JSON.stringify(this.#productos, null, 2, "\t")
      );
    } catch (error) {
      console.error(
        `Error creando producto nuevo: ${JSON.stringify(
          nuevoProducto
        )}, detalle del error: ${error}`
      );
    }
  };

  getProductos = async () => {
    try {
      let productos = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      );
      console.log("Productos encontrados: ", JSON.parse(productos));
      return productos;
    } catch (error) {
      console.log("no se ha podido consultar al archivo");
    }
  };

  getProductoById = async (id) => {
    let isProduct = false;
    let producto;
    try {
      let productos = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      );

      this.#productos = JSON.parse(productos);
      this.#productos.forEach((element) => {
        if (element.id == id) {
          isProduct = true;
          producto = element;
        }
      });

      if (!isProduct) {
        throw `invalid id ${id}`;
      } 
      console.log("Producto encontrado: ", producto);
      return producto;
    } catch (error) {
      console.log("Error al intentar consultar el id del producto - ", error);
    }
  };

  updateProduct = async (id, nuevaData) => {
    let productosActualizados = [];

    try {
      let isProduct = false;
      let productos = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      );

      this.#productos = JSON.parse(productos);
      this.#productos.map((producto) => {
        if (producto.id == id) {
          isProduct = true;
          nuevaData.id = id;
          producto = nuevaData;
        }
        productosActualizados.push(producto);
      });
      console.log(productosActualizados);

      await this.#fileSystem.promises.writeFile(
        this.#filePath,
        JSON.stringify(productosActualizados, null, 2, "\t")
      );
      if (!isProduct) throw `invalid id ${id}`;
    } catch (error) {
      console.log("Error al intentar consultar el id del producto - ", error);
    }
  };

  deleteProduct = async (id) => {
    let productsFilter;
    try {
      let productos = await this.#fileSystem.promises.readFile(
        this.#filePath,
        "utf-8"
      );
      this.#productos = JSON.parse(productos);
      productsFilter = this.#productos.filter(
        (productos) => productos.id != id
      );

      await this.#fileSystem.promises.writeFile(
        this.#filePath,
        JSON.stringify(productsFilter, null, 2, "\t")
      );
    } catch {
      console.log("no se pudo eliminar el archivo");
    }
  };
}

module.exports = ProductManager;
