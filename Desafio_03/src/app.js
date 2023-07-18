import express from 'express';
import ProductManager from "../../Desafio_02/ProductManager.js";

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Server run on port: ${PORT}`);
})

let productManager = new ProductManager();
app.get('/productos', async (req, res)=>{
    try {
        let productos = await productManager.getProductos();
        return res.send(
            productos
        );
        
    } catch (error) {
        console.log("Error al consultar archivo de productos");
    }
})
