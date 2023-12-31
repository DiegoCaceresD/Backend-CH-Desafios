import { Router } from "express";
import ProductManager from "../ProductManager.js";
import { uploader } from "../utils.js";

const router = Router();
const productManager = new ProductManager();

//GET
router.get("/", async (req, res) => {
  try {
    let productos = await productManager.getProductos();
    productos = JSON.parse(productos);

    let { limit } = req.query;
    limit = parseInt(limit);

    if (limit) {
      productos.length = limit;
    }
    return res.send({ status: "success", payload: productos });
  } catch (error) {
    res.status(500).send({ status: "error", msg: error });
  }
});

//GET PRODUCT BY ID
router.get("/:pid", async (req, res) => {
  try {
    let idProduct = parseInt(req.params.pid);
    let producto = await productManager.getProductoById(idProduct);
    return res.send({ status: "succes", payload: JSON.stringify(producto) });
  } catch (error) {
    res.status(500).send({ status: "error", msg: error });
  }
});

//POST 
router.post("/", uploader.array('thumbnails'), async (req, res) => {
  try {
    let products = req.body;
    products.thumbnails = req.files[0].path
    await productManager.addProduct(products);
    return res.send({
      status: "success",
      msg: "Producto añadido exitosamente!",
    });
  } catch (error) {
    return res.status(error.status).send({ status: "error", msg: error.msg });
  }
});

//PUT
router.put("/:pid", async (req, res) => {
  let idProduct = parseInt(req.params.pid);
  try {
    await productManager.updateProduct(idProduct, req.body);
    return res.send({
      status: "success",
      msg: "Producto actualizado exitosamente!",
    });
  } catch (error) {
    return res.status(error.status).send({ status: "error", msg: error.msg });
  }
});

//DELETE
router.delete("/:pid", async (req, res) => {
  let idProduct = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(idProduct);
    return res.send({
      status: "success",
      msg: "Producto eliminado exitosamente!",
    });
  } catch (error) {
    return res.status(error.status).send({ status: "error", msg: error.msg });
  }
});

export default router;
