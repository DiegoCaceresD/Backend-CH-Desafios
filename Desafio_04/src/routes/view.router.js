import ProductManager from "../ProductManager.js";
import express from "express";
const router = express.Router();

const productManager = new ProductManager();

router.get("/", async (req, res) => {
  try {
    let products = await productManager.getProductos();
    products = JSON.parse(products);
    res.render("home", {products: products});
  } catch (error) {
    console.log("error", error);
  }
});

router.get("/realtimeproducts", (req, res)=>{
    res.render("realtimeproducts")
})

export default router;
