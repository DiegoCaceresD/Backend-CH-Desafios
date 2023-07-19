import express from "express";
import ProductManager from "../../Desafio_02/ProductManager.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server run on port: ${PORT}`);
});

//instancia de la clase
let productManager = new ProductManager();

//GET ALLPRODUCTS
app.get("/productos", async (req, res) => {
  try {
    // llamo a todos los productos
    let productos = await productManager.getProductos();
    productos = JSON.parse(productos);

    // //destructuro las querys que me puedan venir para solo utilizar la query "limit"
    let { limit } = req.query;
    limit = parseInt(limit);

    // //si existe la query limits, la uso para definir el length del array productos
    if (limit) {
      productos.length = limit;
    }
    return res.send(productos);
  } catch (error) {
    console.log("Error al consultar archivo de productos", error);
  }
});


//GET PRODUCTBY ID
app.get("/productos/:pid", async (req, res) => {
  try {
    let idProduct = parseInt(req.params.pid);
    let producto = await productManager.getProductoById(idProduct);
    return res.send(JSON.stringify(producto));
  } catch (error) {
    console.log("Error al consultar el archivo por id: ", error);
  }
});
